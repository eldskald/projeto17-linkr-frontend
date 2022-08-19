import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Feed from './Feed';
import NewPost from './NewPost';
import TrendingHashtags from '../hashtags/TrendingHashtags';
import NewPostsPopUp from './NewPostsPopUp';

const API_URL = process.env.REACT_APP_API_URL;

function Home() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState('true');
    const [isFollowing, setIsFollowing] = useState(false);
    const [scrollMore, setScrollMore] = useState(true);
    const [error, setError] = useState(false);
    const [trendingTagsReloader, setTrendingTagsReloader] = useState(true);

    useEffect(() => {
        if (!token) return navigate('/');
        axios.get(`${API_URL}/total-follows`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data > 0) {
                    setIsFollowing(true);
                    loadPosts();
                } else {
                    setIsFollowing(false);
                    setLoading('');
                }
            })
            .catch(() => {
                setLoading('');
                setError(true);
            });
    }, []);

    function loadPosts(moreContent) {
        let queryStrings;
        if (moreContent) {
            queryStrings = `?limit=10&offset=${posts.length}`;
        } else {
            setLoading('true');
            setPosts([]);
            queryStrings = `?limit=10&offset=0`;
        }
        setError(false);
        setTrendingTagsReloader(!trendingTagsReloader)
        axios.get(`${API_URL}/posts${queryStrings}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setLoading('');
                if (moreContent) {
                    if (res.data.length === 0) setScrollMore(false);
                    else setPosts([...posts, ...res.data]);
                } else {
                    setPosts([...res.data]);
                }
            })
            .catch(() => {
                setLoading('');
                setError(true);
            });
    }

    return (
        <>
            <Header />
            <ContainerAll id='scrollable'>
                <SubContainerAll>
                    <TitleWrapper>timeline</TitleWrapper>
                    <SubContainer>
                        <Container>
                            <NewPost reloadPosts={loadPosts} />
                            <NewPostsPopUp posts={posts} reloadPosts={loadPosts} />
                            {loading ? (
                                <SpinnerWrapper>
                                    <ClipLoader
                                        color={'var(--contrastcolor1)'}
                                        size={150}
                                    />
                                </SpinnerWrapper>
                            ) : (
                                isFollowing ? (
                                    posts.length === 0 && !error ? (
                                        <EmptyFeed>
                                            <p>
                                                No posts found from your friends.
                                            </p>
                                        </EmptyFeed>
                                    ) : (
                                        <Feed
                                            posts={posts}
                                            loading={loading}
                                            error={error}
                                            reloadFeed={loadPosts}
                                            scrollMore={scrollMore}
                                        />
                                )) : (
                                    <EmptyFeed>
                                        <p>
                                            You don't follow anyone yet.<br/>
                                            Search for new friends!
                                        </p>
                                    </EmptyFeed>
                            ))}
                        </Container>
                        <TrendingHashtags reload={trendingTagsReloader} />
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

const EmptyFeed = styled.div`
    padding-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    > p {
        font-family: var(--scriptfont);
        font-size: 20px;
        color: var(--textcolor2);
        text-align: center;
    }
`;

const SpinnerWrapper = styled.div`
    margin-top: 64px;
`;

export default Home;
