import { IoHeartOutline,IoHeart } from "react-icons/io5";

import { IconContext } from "react-icons";
import styled from 'styled-components';
import { useState } from "react";


export default function LikeButton(props){
    const [liked,setLiked]=useState(false);
    function like(){
        if(liked){
            setLiked(false)
        }
        if(!liked){
            setLiked(true)
        }
    }

    return(

       
        <IconContext.Provider value={{ color: liked?"red":"white", size:35 }}>
            <Container>
                <Button onClick={like}>
                    {liked?<IoHeart />:<IoHeartOutline />}
                </Button>
            </Container>
        </IconContext.Provider>
    )
}
const Container=styled.div`
margin:20px 16px 0 0;
`;
const Button=styled.button`
background:none;
border-style: none;
`;
