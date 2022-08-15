import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Feed from './Feed';
import NewPost from './NewPost';
import TrendingHashtags from '../hashtags/TrendingHashtags';

const API_URL = process.env.REACT_APP_API_URL;

function Home() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState('true');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!token) return navigate('/');
        loadPosts();
    }, []);

    function loadPosts() {
        setLoading('true');
        setPosts([]);
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
            .catch(() => {
                setLoading('');
                setError(true)
            });
    }

    return (
        <>
            <Header />
            <ContainerAll>
                <SubContainerAll>
                    <TitleWrapper>timeline</TitleWrapper>
                    <SubContainer>
                        <Container>
                            <NewPost reloadPosts={loadPosts} />
                            <Feed
                                posts={posts}
                                loading={loading}
                                error={error}
                                reloadFeed={loadPosts}
                            />
                        </Container>
                        <TrendingHashtags />
                    </SubContainer>
                </SubContainerAll>
            </ContainerAll>
        </>
    );
}

const ContainerAll = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    @media (max-width: 612px) {
        width: 100%;
    }
`;

const SubContainerAll = styled.div`
    
    padding-top: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 900px) {
        padding-top: 144px;
    }
    @media (max-width: 612px) {
        width: 100%;
    }
`;

const TitleWrapper = styled.div`

    width:calc(100% - 32px);  
    height: 64px;
    margin: 42px 0 24px 32px;
    font-family: var(--headerfont);
    font-weight: 700;
    font-size: 42px;
    color: var(--textcolor1);

    @media (max-width: 612px) {
        margin-top: 32px;
    }
`;

const SubContainer = styled.div`
    margin-top: 16px;
    width: fit-content;
    display: flex;
    @media (max-width: 612px) {
        width: 100%;
    }
`;

const Container = styled.div`
    height: 100%;
    padding-bottom: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 612px) {
        width: 100%;
    }
`;

const HashtagFeedDiv = styled.div`
    background-color: var(--divcolor1);
    width: 301px;
    height: 406px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    margin: 0px 0px 0px 25px;
    font-family: var(--headerfont);
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: var(--textcolor1);
    border-radius: 16px;
    position: sticky;
    top: 94px;

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
`;

const HashtagDiv = styled.div`
    padding: 14px 0px 0px 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: flex-start;
`;

export default Home;
