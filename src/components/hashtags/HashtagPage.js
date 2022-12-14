import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Feed from '../posts/Feed';
import TrendingHashtags from './TrendingHashtags';

export default function HashtagPage() {

    const API_URL = process.env.REACT_APP_API_URL;

    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    const {hashtag} = useParams();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState('true');
    const [scrollMore, setScrollMore] = useState(true);
    const [error, setError] = useState(false);
    const [trendingTagsReloader, setTrendingTagsReloader] = useState(true);

    useEffect(() => {
        if (!token) return navigate('/');
        loadPosts();
    }, [hashtag]);

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
        axios.get(`${API_URL}/hashtags/${hashtag}${queryStrings}`,
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
                    <TitleWrapper>#{hashtag}</TitleWrapper>
                    <SubContainer>
                        <Container>
                            <Feed
                                posts={posts}
                                loading={loading}
                                error={error}
                                reloadFeed={loadPosts}
                                scrollMore={scrollMore}
                            />
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
`;

const SubContainerAll = styled.div`
    height: 100%;
    padding-top: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 900px) {
        padding-top: 144px;
    }
`;

const TitleWrapper = styled.div`
    width: 100%;
    height: 64px;
    margin: 42px 0px 24px 0px;
    
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

const SubContainer = styled.div`
    margin-top: 16px;
    width: fit-content;
    display: flex;
`;

const Container = styled.div`
    width: 612px;
    height: 100%;
    padding-bottom: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 612px) {
        width: 100%;
    }
`;

