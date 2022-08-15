import styled from 'styled-components';
import { useState,useEffect } from 'react';

export default function Alert(props){
    const [displaying, setDisplaying]=useState(false);
    const [errorMessage, setErrorMessage]=useState([]);
    useEffect(() => {
        if(props.error){
            setDisplaying(true);
            setErrorMessage(props.error.split("\n"))
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
                {errorMessage.map(error=><Error error={error} />)}
                { props.button ? (
                    <Button onClick={cleanError}>OK</Button>
                ) : (
                    <></>
                )}
            </Message>
        </BackgroundFade>
    );
}
function Error(props){
    return(<p>{props.error}</p>);
}

const BackgroundFade=styled.div `
background:rgba(0, 0, 0,0.5);
z-index: 5;
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
border-radius: 16px;
background: var(--divcolor4);
box-sizing: border-box;
padding: 16px 32px;
display: flex;
align-items: center;
flex-direction: column;
p{
    font-family: var(--scriptfont);
    font-size: 25px;
}
`;

const Button= styled.button`
border-style: none;
background: var(--buttonbg);
margin-top: 16px;
font-family: var(--headerfont);
font-style: normal;
font-weight: 700;
font-size: 27px;
border-radius: 5px;
color:var(--textcolor1)
`;
