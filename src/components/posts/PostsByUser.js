import { useState, useEffect, useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import Header from '../Header';
import Feed from './Feed';
import Hashtag from '../hashtags/Hashtag';

const API_URL = process.env.REACT_APP_API_URL;

function Home() {

    const { token } = useContext(UserContext);
    const {userId}=useParams();
    const navigate = useNavigate();
    const [viewdUser,setViewdUser]=useState({});
    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState('true');
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!token) return navigate('/');
        loadUser();
        loadPostsAndHashtags();
    }, []);

    function loadPostsAndHashtags() {
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

        axios.get(`${API_URL}/hashtags`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setHashtags([...res.data]);
            })
            .catch(err => {
                console.log("Error at Home.js useEffect" + err.message);
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
                            <Feed posts={posts} loading={loading} error={error} />
                        </Container>
                        <HashtagFeedDiv>
                            <TrendingDiv>
                                <h3>trending</h3>
                            </TrendingDiv>
                            <HashtagDiv>
                                {hashtags.map((h, i)=>(
                                    <Hashtag
                                        key={i}
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
    top: 72px;

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
