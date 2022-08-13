import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Feed from './Feed';
import NewPost from './NewPost';
import Hashtag from '../hashtags/Hashtag';

const API_URL = process.env.REACT_APP_API_URL;

function Home() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState('true');

    useEffect(() => {
        if (!token) return navigate('/');
        loadPostsAndHashtags();
    }, []);

    function loadPostsAndHashtags() {
        axios.get(`${API_URL}/posts?limit=10&offset=0`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setLoading('');
                console.log(res.data)
                setPosts([...res.data]);
            })
            .catch(err => {
                console.log("Error at Home.js useEffect" + err.message);
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
                console.log("Error at Home.js useEffect" + err.message);
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
                            <NewPost reloadPosts={loadPostsAndHashtags} />
                            <Feed posts={posts} />
                            <SpinnerWrapper loading={loading}>
                                <ClipLoader
                                    color={'var(--contrastcolor1)'}
                                    size={150}
                                />
                            </SpinnerWrapper>
                        </Container>
                        <HashtagFeedDiv>
                            <TrendingDiv>
                                <h3>trending</h3>
                            </TrendingDiv>
                            <HashtagDiv>
                                {hashtags.map((h)=>(
                                    <Hashtag
                                        hashtag={h.name}
                                    />
                                ))}
                            </HashtagDiv>
                        </HashtagFeedDiv>
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
    padding: 72px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SpinnerWrapper = styled.div`
    margin-top: 64px;
    display: ${props => props.loading ? 'block' : 'none'};
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
