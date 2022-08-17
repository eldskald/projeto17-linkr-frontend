import styled from 'styled-components';
import { useState, useEffect } from 'react';

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
                <Error>
                    {errorMessage.map((error, index) => <span key={index}>{error}</span>)}
                </Error>
                { props.button ? (
                    <Button onClick={cleanError}>OK</Button>
                ) : (
                    <></>
                )}
            </Message>
        </BackgroundFade>
    );
}

const BackgroundFade = styled.div `
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

const Message = styled.div`
    opacity: 1;
    border-radius: 16px;
    background: var(--divcolor4);
    box-sizing: border-box;
    padding: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (max-width: 612px) {
        padding: 16px;
    }
`;

const Error = styled.div`
    margin-bottom: 42px;
    span {
        font-family: var(--scriptfont);
        font-size: 25px;
        @media (max-width: 612px) {
            font-size: 20px;
        }
    }
    @media (max-width: 612px) {
        margin-bottom: 20px;
    }
`;

const Button = styled.button`
    border-style: none;
    padding: 0px 16px;
    background: var(--buttonbg);
    font-family: var(--headerfont);
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    border-radius: 5px;
    color:var(--textcolor1);
    cursor: pointer;
`;
