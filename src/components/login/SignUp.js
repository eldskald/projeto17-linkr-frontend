import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import LogDiv from '../../styles/login/LoginDiv';
import Splash from './Splash';
import Field from '../../styles/login/LoginField';
import Button from '../../styles/login/LoginButton';
import axios from 'axios';


function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [userName, setUserName]=useState("");
    const [isDisabled, setDisabled]=useState(false);
    const navigation=useNavigate();
    const { token, setToken } =useContext(UserContext);

    function handleSubmit(event){
    event.preventDefault();
        if(email===""){
            alert("Please fill in your E-mail address")
        }
        else if(password===""){
            alert("Please fill in your password")
        }
        else if(userName===""){
            alert("Please fill in your username")
        }
        else if(profilePictureUrl===""){
            alert("Please fill in a URL for your profile picture")
        }
        else{
        sendSignUp();
        }
    }
    function sendSignUp(){
       const submitObject={
            email:email.toLowerCase(),
            password:password,
            name:userName,
            pictureUrl:profilePictureUrl}
        setDisabled(true);
        const request = axios.post(process.env.REACT_APP_API_URL + "/signup", submitObject)
        request.then(response=>{
            setDisabled(false);
            if(response.status===201){
            localStorage.setItem('linkrToken', response.data);
            setToken(response.token);            
            navigation('/')
            }
            
        })
        request.catch(error=>{
            setDisabled(false);
            if(error.response.status===401){
                alert("Invalid E-mail or password")
            }
            else if(error.response.status===500){
                alert("Server Error");
            }
            else{
                alert("Unknown Error");
            }
        });
    };
    return (
        <>
            <Container>
                <Splash></Splash>
                <LogDiv>
                    <Form onSubmit={handleSubmit}>
                        <Field placeholder="e-mail" type="email" value={email} required onChange={e => setEmail(e.target.value)} disabled={isDisabled ? true : false} />
                        <Field placeholder="password" type="password" value={password} required onChange={e => setPassword(e.target.value)} disabled={isDisabled ? true : false} />
                        <Field placeholder="username" type="text" value={userName} required onChange={e => setUserName(e.target.value)} disabled={isDisabled ? true : false} />
                        <Field placeholder="picture url" type="text" value={profilePictureUrl} required onChange={e => setProfilePictureUrl(e.target.value)} disabled={isDisabled ? true : false} />
                        <Button type="submit" onClick={handleSubmit} disabled={isDisabled ? true : false}>Sign Up</Button>
                    </Form>
                </LogDiv>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    background-color: var(--divcolor1);
`;
const Form = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    a{
        font-family:var(--scriptfont);
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        color:var(--textcolor1)
    }
`;
export default SignUp;
