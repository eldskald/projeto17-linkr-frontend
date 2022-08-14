import { IoHeartOutline,IoHeart } from "react-icons/io5";
import { IconContext } from "react-icons";
import styled from 'styled-components';
import { useState, useEffect,useContext } from "react";
import ReactDOMServer from 'react-dom/server';
import UserContext from '../../shared/userContext';
import axios from "axios";
import ReactTooltip from 'react-tooltip';

const API_URL = process.env.REACT_APP_API_URL;

export default function LikeButton(props){
    const [liked,setLiked]=useState(false);
    const [likes,setLikes]=useState(Number(props.likes));
    const [likerNames,setLikerNames]=useState([]);
    const [tooltipMessage,setTooltipMessage]=useState("");
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
        getLikerNames();
        if(props.liked===1){
            setLiked(true)
        }
        handleTooltipMessage();
    }, []);
    useEffect(()=>{
        handleTooltipMessage()
    },[likes,likerNames])
    function unlike() {
        axios.post(`${API_URL}/unlike`,{postId:props.postId},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setDisabled(false);
                setLiked(false);
                setLikes(likes-1);
            })
            .catch(() => {
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
            .then(() => {
                setDisabled(false);
                setLiked(true);
                setLikes(likes+1);
            })
            .catch(() => {
                setDisabled(false);
            });
    }
    function handleTooltipMessage(){
        if(liked){
            if(likes>2){
                setTooltipMessage(`You, ${likerNames[0]} and ${(likes-2)} others liked this"`)
            }
            else if(likes===2){
                setTooltipMessage(`You and ${likerNames[0]} liked this`)
            }
            else{
                setTooltipMessage(`You liked this`)
            }
        }
        if(!liked){
            if(likes>2){
                setTooltipMessage(`${likerNames[0]}, ${likerNames[1]} and ${likes-2} others liked this`)
            }
            else if(likes===2){
                setTooltipMessage(`${likerNames[0]} and ${likerNames[1]} liked this`)
            }
            else if(likes==1){
                setTooltipMessage(`${likerNames[0]} liked this`)
            }
            else{
                setTooltipMessage(`Be the first to like this!`)
            }
        }
    }
    function getLikerNames(){
        axios.post(`${API_URL}/likernames`,
        {
            postId: props.postId
        },
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setLikerNames(response.data.map(entry=>entry.name));
            handleTooltipMessage();
        })
    }
    return(
        <IconContext.Provider
            value={{
                color: liked ? "var(--contrastcolor2)" : "var(--divcolor4)",
                size: 35
            }}
        >
            <Container>
                <Button
                    data-tip={ReactDOMServer.renderToString(
                        <TooltipDiv>{tooltipMessage}</TooltipDiv>
                    )}
                    data-html={true}
                    onClick={handleLike}
                    disabled={disabled ? true : false}
                >
                    {liked?<IoHeart />:<IoHeartOutline />}
                </Button>
                <p >{likes} likes</p>
                <ReactTooltip
                    place='bottom'
                    backgroundColor='transparent'
                />
            </Container>
        </IconContext.Provider>
    )
}
const Container=styled.div`
    margin:20px 16px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        margin-top: 12px;
        font-family:var(--scriptfont);
        color:var(--textcolor1);
        font-size: 11px;
    }
`;
const Button=styled.button`
    background:none;
    border-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        transform: scale(1.3);
    }
    :disabled {
        opacity: 0.5;
    }
`;
const TooltipDiv=styled.div`
    padding: 8px;
    border-radius: 8px;
    background-color: var(--divcolor4);
    font-family: var(--scriptfont);
    font-size: 14px;
    color: var(--textcolor4);
`;
