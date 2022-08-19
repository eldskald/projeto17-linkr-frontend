import { useState, useEffect, useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Feed from './Feed';
import TrendingHashtags from '../hashtags/TrendingHashtags';
import Alert from '../Alert';

const API_URL = process.env.REACT_APP_API_URL;

function Home() {

    const { token, user } = useContext(UserContext);
    const { userId: viewedUserId } = useParams();
    const navigate = useNavigate();

    const [viewedUser,setViewedUser]=useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState('true');
    const [scrollMore, setScrollMore] = useState(true);
    const [error, setError] = useState(false)
    const [userError, setUserError] = useState('');
    const [popup, setPopup] = useState('');
    const [trendingTagsReloader, setTrendingTagsReloader] = useState(true);

    useEffect(() => {
        if (!token) return navigate('/');
        loadUser();
        loadPosts();
    }, [viewedUserId]);

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
        axios.get(`${API_URL}/posts/${viewedUserId}${queryStrings}`,
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

    function loadUser(){
        const config =({
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const request = axios.get(API_URL + "/getuser/"+viewedUserId, config)
        request.then(response=>{
        if(response.status===200){
                setViewedUser(response.data); 
            }
         })
         request.catch(err=>{
                setUserError(err.response.data);
         });
     };

    function handleFollow() {
        axios.post(`${API_URL}/follow/${viewedUserId}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setPopup(`You are now following ${viewedUser.name}!`);
                setViewedUser({ ...viewedUser, following: true });
            })
            .catch(() => {
                setPopup(`Error! Try again later.`);
            })
    }

    function handleUnfollow() {
        axios.delete(`${API_URL}/unfollow/${viewedUserId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setPopup(`You unfollowed ${viewedUser.name}.`);
                setViewedUser({ ...viewedUser, following: false });
            })
            .catch(() => {
                setPopup(`Error! Try again later.`)
            });
    }

    return (
        <>
            <Header />
            <ContainerAll id='scrollable'>
                <SubContainerAll>
                    <TitleWrapper>
                        { userError ? (
                            <UserErrorMessage>
                                {userError}
                            </UserErrorMessage>
                        ) : (
                            <>
                                <UserWrapper>
                                    <AvatarImg
                                        src={viewedUser.profilePictureUrl}
                                        alt={viewedUser.name}
                                    /> 
                                    <h1>{viewedUser.name}'s posts</h1>
                                </UserWrapper>
                                { viewedUserId == user.id ? (
                                    <></>
                                ) : (
                                    viewedUser.following ? (
                                        <FollowButton onClick={handleUnfollow}>
                                            Unfollow
                                        </FollowButton>
                                    ) : (
                                        <FollowButton onClick={handleFollow}>
                                            Follow
                                        </FollowButton>
                                    )
                                )}
                            </>
                        )}
                    </TitleWrapper>
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
            <Alert error={popup} setError={setPopup} button={true} />
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

const AvatarImg = styled.img`
    width: 52px;
    height: 52px;
    object-fit: border;
    border-radius: 50%;
    margin-right: 18px;
`;

const TitleWrapper = styled.div`
    width: 100%;
    height: 64px;
    margin: 42px 0px 24px 0px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 612px) {
        width: 100%;
        padding-left: 32px;
        margin-top: 32px;
    }
`;

const UserWrapper = styled.div`
    display: flex;
    h1{
        font-family: var(--headerfont);
        font-weight: 700;
        font-size: 42px;
        color: var(--textcolor1);
    }
`;

const UserErrorMessage = styled.div`
    font-family: var(--headerfont);
    font-size: 42px;
    font-weight: 700;
    color: var(--contrastcolor2);
`;

const FollowButton = styled.div`
    width: 128px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--contrastcolor1);
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--scriptfont);
    font-size: 16px;
    font-weight: 700;
    color: var(--textcolor1);

    :disabled {
        cursor: default;
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

export default Home;
