import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import LogDiv from '../../styles/login/LoginDiv';
import Splash from './Splash';
import Field from '../../styles/login/LoginField';
import Button from '../../styles/login/LoginButton';
import axios from 'axios';
import Alert from '../Alert';


function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [userName, setUserName]=useState("");
    const [isDisabled, setDisabled]=useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigation=useNavigate();
    const { token, setToken } =useContext(UserContext);

    function handleSubmit(event){
    event.preventDefault();
        if(email===""){
            setError("Please fill in your E-mail address")
        }
        else if(password===""){
            setError("Please fill in your password")
        }
        else if(userName===""){
            setError("Please fill in your username")
        }
        else if(profilePictureUrl===""){
            setError("Please fill in a URL for your profile picture")
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
            if(response.status===201){       
                setSuccess(true);
                setError('Success! Redirecting to login...')
                setTimeout(() => navigation('/'), 3000)
            }
            
        })
        request.catch(error=>{
            setDisabled(false);
            if(error.response.status===422){
                setError(error.response.data)
            }
            else if (error.response.status===409){
                setError("This E-mail is already registered!")
            }
            else if(error.response.status===500){
                setError("Server Error");
            }
            else{
                setError("Unknown Error");
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
                        <Button type="submit" disabled={isDisabled ? true : false}>Sign Up</Button>
                        <Link to="/">Switch back to log in</Link>
                    </Form>
                </LogDiv>
                <Alert error={error} setError={setError} button={!success} />
            </Container>
        </>
    );
}
const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    background-color: var(--divcolor1);
    @media screen and (max-width:900px){
        flex-direction: column;
    }
`;
const Form = styled.form`
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
