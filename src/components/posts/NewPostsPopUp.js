import axios from 'axios';
import { useState, useContext } from 'react';
import useInterval from 'use-interval';
import UserContext from '../../shared/userContext';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL;

export default function NewPostsPopUp({ reloadPosts, posts}){
    const { token } = useContext(UserContext);
    const [newPosts, setNewPosts] = useState(false);

    useInterval(() => {
        if (posts.length === 0) {
            return;
        }

        axios.get(`${API_URL}/posts?limit=1&offset=0`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                const newestTime = res.data[0].createdTime;
                if (newestTime > posts[0].createdTime) {
                    setNewPosts(true);
                }
            });
    }, 5000);

    return (
        newPosts ? (
            <NewPostsDiv onClick={reloadPosts}>
                New posts, click to load more!
            </NewPostsDiv>
        ) : (<></>)
    );
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
