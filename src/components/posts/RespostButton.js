import { BiRepost } from "react-icons/bi";
import { IconContext } from "react-icons";
import styled from 'styled-components';
import { useState, useEffect,useContext } from "react";
import ReactDOMServer from 'react-dom/server';
import UserContext from '../../shared/userContext';
import axios from "axios";
import Alert from "../Alert";

const API_URL = process.env.REACT_APP_API_URL;

export default function RepostButton(props){
    const [reposts,setReposts]=useState(Number(props.reposts));
    const [message,setMessage]=useState('');
    const [reposting,setReposting]=useState(false);
    const { token } = useContext(UserContext);
    function handleRepost(){

        axios.post(`${API_URL}/repost/${props.postId}`,"",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setReposting(false);

            })
            .catch(err => {
                setReposting(false);
                setMessage(err.response.data)
            });
        
    }
    return(
        <IconContext.Provider
            value={{
                color:"var(--divcolor4)",
                size: 35
            }}>

            <Container>
                <Button 
                    onClick={() => setReposting(!reposting)}
                    disabled={reposting ? true : false}
                >
                    <BiRepost />
                </Button>
                <p>{props.reposts} reposts</p>
            </Container>
            <Alert error={message} setError={setMessage} button={true} />
            { reposting ? (
                <DeletePopupBackground>
                    <DeletePopup>
                        <p>Do you want to<br/>repost this link?</p>
                        <div>
                            <CancelButton onClick={() => setReposting(false)}>
                                <p>No, cancel</p>
                            </CancelButton>
                            <DeleteButton onClick={handleRepost}>
                                <p>Yes, Share it</p>
                            </DeleteButton>
                        </div>
                    </DeletePopup>
                </DeletePopupBackground>
            ) : (<></>)}
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

const DeletePopupBackground = styled.div`
    background: rgba(0, 0, 0, 0.25);
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeletePopup = styled.div`
    opacity: 1;
    border-radius: 16px;
    background: var(--divcolor1);
    box-sizing: border-box;
    padding: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;

    > p {
        font-family: var(--scriptfont);
        color: var(--textcolor1);
        text-align: center;
        font-size: 25px;
    }

    > div {
        margin-top: 32px;
        display: flex;
        justify-content: space-around;
    }
`;

const DeleteButton = styled.div`
    padding: 12px 36px;
    background-color: var(--contrastcolor1);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > p {
        font-family: var(--scriptfont);
        color: var(--textcolor1);
        font-size: 20px;
    }
`;

const CancelButton = styled.div`
    margin: 0px 32px;
    padding: 12px 36px;
    background-color: var(--divcolor4);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > p {
        font-family: var(--scriptfont);
        color: var(--contrastcolor1);
        font-size: 20px;
    }
`;
