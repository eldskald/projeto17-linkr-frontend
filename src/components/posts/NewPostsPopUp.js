import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../shared/userContext';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL;

export default function NewPostsPopUp({ reloadPosts, posts}){
    const { token } = useContext(UserContext);
    const [nPosts, setnPosts] = useState([]);
    const [teste2, setTeste2] = useState(0);

    useEffect(() => {
        const interval = setInterval(checkForMorePosts, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    function checkForMorePosts() {
        axios.get(`${API_URL}/posts/time/${teste}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setnPosts(res.data.length);
            console.log(nPosts);
        })
    }

    if(nPosts > 0){
        return(
           <NewPostsDiv onClick={reloadPosts}> {nPosts} new posts, load more! </NewPostsDiv>
        )}else{
            return;
        }
}

const NewPostsDiv = styled.div`
    width: 611px;
    height: 61px;
    font-family: var(--scriptfont);
    font-size: 20px;
    background: var(--contrastcolor1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin: 0px 0px 17px 0px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color:  var(--divcolor3);
    :hover{
        background-color: var(--divcolor3);
        transition: 0.5s;
        color: var(--contrastcolor1);
    }
    @media (max-width: 612px) {
        width: 100%;
    }
`
