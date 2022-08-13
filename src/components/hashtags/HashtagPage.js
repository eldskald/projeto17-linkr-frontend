import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Post from '../posts/Post';
import Hashtag from '../hashtags/Hashtag';


export default function HashtagPage() {

    const API_URL = process.env.REACT_APP_API_URL;

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState('true');
    let {hashtag} = useParams();

    useEffect(() => {
        if (!token) return navigate('/');
        loadPostsAndHashtags();
    }, [hashtag]);

    function loadPostsAndHashtags() {
    
        axios.get(`${API_URL}/hashtags/${hashtag}`,
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

        axios.get(`${API_URL}/hashtags`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setLoading('');
                setHashtags([...res.data]);
            })
            .catch(err => {
                alert("Error at Home.js useEffect" + err.message);
            });
        
    }

    return (
        <>
            <Header />
            <ContainerAll>
                <Container>
                    <TitleWrapper>{hashtag}</TitleWrapper>
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
                <HashtagFeedDiv>
                    <TrendingDiv>
                        <h3>trending</h3>
                    </TrendingDiv>
                    <HashtagDiv>
                        {hashtags.map((h)=>(
                            <Hashtag
                                hashtag={h.name}
                                reloadPosts={loadPostsAndHashtags}
                            />
                        ))}
                    </HashtagDiv>
                </HashtagFeedDiv>
            </ContainerAll>
        </>
    );
}

const Container = styled.div`
    height: 100%;

    padding: 72px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const ContainerAll = styled.div`
    height: 100%;
    padding: 72px 0px 0px 0px;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
`
const HashtagFeedDiv = styled.div`
    background-color: var(--divcolor1);
    width: 301px;
    height: 406px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    margin: 195px 0px 0px 25px;
    font-family: var(--headerfont);
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: var(--textcolor1);
    position: sticky;
    top: 10px;
    right: 70px;
    border-radius: 16px;
    h3{
        font-size: 27px;
        padding: 0px 0px 0px 16px;
    }

    @media (max-width: 1050px) {
        display: none;
    }
`;

const TrendingDiv = styled.div`
    border-bottom: 1px solid var(--border);
    height: 17%;
    min-height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 0px 5px 0px;
`
const HashtagDiv = styled.div`
    padding: 14px 0px 0px 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: flex-start;
`