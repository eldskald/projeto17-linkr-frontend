import { IoHeartOutline,IoHeart } from "react-icons/io5";
import { IconContext } from "react-icons";
import styled from 'styled-components';
import { useState, useEffect,useContext } from "react";
import UserContext from '../../shared/userContext';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default function LikeButton(props){
    const [liked,setLiked]=useState(false);
    const [likes,setLikes]=useState(0);
    const [disabled,setDisabled]=useState(false);
    const { token } = useContext(UserContext);
    function handleLike(){
        if(liked){
            setDisabled(true);
            unlike();
        }
        if(!liked){
            setDisabled(true);
            like();
        }
    }  
    useEffect(() => {
        setLikes(Number(props.likes))
        if(props.liked===1){
            setLiked(true)
        }
    }, []);
    function unlike() {
        axios.post(`${API_URL}/unlike`,{postId:props.postId},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setDisabled(false);
                setLiked(false);
                setLikes(likes-1);
            })
            .catch(err => {
                alert("Error at likebutton delete:" + err.message);
                setDisabled(false);
            });
    }
    function like() {
        axios.post(`${API_URL}/like`,{postId:props.postId},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setDisabled(false);
                setLiked(true);
                setLikes(likes+1);
            })
            .catch(err => {
                alert("Error at likebutton delete:" + err.message);
                setDisabled(false);
            });
    }

    return(

       
        <IconContext.Provider value={{ color: liked?"red":"white", size:35 }}>
            <Container>
                <Button onClick={handleLike} disabled={disabled ? true : false}>
                    {liked?<IoHeart />:<IoHeartOutline />}
                </Button>
                <p>{likes} likes</p>
            </Container>
        </IconContext.Provider>
    )
}
const Container=styled.div`
margin:20px 16px 0 0;
display: flex;
flex-direction: column;
align-items: center;
p{
    font-family:var(--scriptfont);
    color:var(--textcolor1);
    font-size: 11px;
}
`;
const Button=styled.button`
background:none;
border-style: none;
:disabled{
    opacity: 0.5;
}
`;
