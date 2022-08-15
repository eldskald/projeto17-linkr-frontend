import { useState, useEffect, useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Feed from './Feed';
import TrendingHashtags from '../hashtags/TrendingHashtags';

const API_URL = process.env.REACT_APP_API_URL;

function Home() {

    const { token } = useContext(UserContext);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [viewdUser,setViewdUser]=useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState('true');
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!token) return navigate('/');
        loadUser();
        loadPosts();
    }, [userId]);

    function loadPosts() {
        setLoading('true');
        setPosts([]);
        axios.get(`${API_URL}/posts/${userId}?limit=10&offset=0`,
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
                setError(true);
            });
    }

    function loadUser(){
        const config =({
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const request = axios.get(API_URL + "/getuser/"+userId, config)
        request.then(response=>{
        if(response.status===200){
            setViewdUser(response.data); 
            }
         })
         request.catch(err=>{
             if(err.response.status===404){
                alert("404 user not found")
             }
             else if(err.response.status===401){
                alert("invalid Session")
             }
         });
     };

    return (
        <>
            <Header />
            <ContainerAll>
                <SubContainerAll>
                    <TitleWrapper>
                        <AvatarImg src={viewdUser.profilePictureUrl} alt={viewdUser.name} /> 
                        <h1>{viewdUser.name}'s posts</h1>
                    </TitleWrapper>
                    <SubContainer>
                        <Container>
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
    justify-content: left;
    align-items: center;
    h1{
        font-family: var(--headerfont);
        font-weight: 700;
        font-size: 42px;
        color: var(--textcolor1);
    }
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

export default Home;
