import styled from 'styled-components';
import { useState,useEffect } from 'react';

export default function Alert(props){
    const [displaying, setDisplaying]=useState(false);
    useEffect(() => {
        if(props.error){
            setDisplaying(true);
        }
        else{
            setDisplaying(false);
        }
        
        return;
    }, [props.error]);
    function cleanError(){
        props.setError("");
    }
    return(
        <BackgroundFade displaying={displaying}>
            <Message>
                <p>{props.error}</p>
                <Button onClick={cleanError}>OK</Button>
            </Message>
        </BackgroundFade>
    );
}

const BackgroundFade=styled.div `
background:rgba(0, 0, 0,0.5);
z-index: 1;
position:absolute;
top:0;
left: 0;
width: 100%;
height:100%;
display: ${props => props.displaying? "flex":"none"};
justify-content: center;
align-items: center;
`;
const Message=styled.div`
opacity: 1;
border-radius: 25px;
background: var(--divcolor4);
box-sizing: border-box;
padding: 15px;
p{
    font-family: var(--scriptfont);
    font-size: 25px;
    margin-bottom: 5px;
}
display: flex;
align-items: center;
flex-direction: column;
`;
const Button= styled.button`
border-style: none;
background: var(--buttonbg);
font-family: var(--headerfont);
font-style: normal;
font-weight: 700;
font-size: 27px;
border-radius: 5px;
color:var(--textcolor1)
`;