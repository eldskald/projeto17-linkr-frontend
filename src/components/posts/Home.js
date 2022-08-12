import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Post from './Post';
import NewPost from './NewPost';

const API_URL = process.env.REACT_APP_API_URL;

function Home() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState('true');

    useEffect(() => {
        if (!token) return navigate('/');
        loadPosts();
    }, []);

    function loadPosts() {
        axios.get(`${API_URL}/posts?limit=10&offset=0`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setLoading('');
                setPosts([...res.data]);
            })
            .catch(err => {
                alert("Error at Home.js useEffect" + err.message);
            });
    }

    return (
        <>
            <Header />
            <Container>
                <TitleWrapper>timeline</TitleWrapper>
                <NewPost reloadPosts={loadPosts} />
                <SpinnerWrapper loading={loading}>
                    <ClipLoader
                        color={'var(--contrastcolor1)'}
                        size={150}
                    />
                </SpinnerWrapper>
                {posts.map((post, index) => (
                    <Post
                        key={index}
                        authorName={post.authorName}
                        authorPicture={post.authorPicture}
                        description={post.description}
                        liked={post.liked}
                        likes={post.likes}
                        metadata={post.metadata}
                    />
                ))}
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100%;

    padding: 72px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
`;

const TitleWrapper = styled.div`
    width: 612px;
    height: 64px;
    margin-top: 64px;
    
    font-family: var(--headerfont);
    font-weight: 700;
    font-size: 42px;
    color: var(--textcolor1);

    @media (max-width: 612px) {
        width: 100%;
        padding-left: 32px;
        margin-top: 32px;
    }
`;

const SpinnerWrapper = styled.div`
    margin-top: 128px;
    display: ${props => props.loading ? 'block' : 'none'};
`;

export default Home;
