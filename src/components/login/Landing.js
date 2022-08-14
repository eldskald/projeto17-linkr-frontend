import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import LoginDiv from '../../styles/login/LoginDiv';
import Splash from './Splash';
import Field from '../../styles/login/LoginField';
import Button from '../../styles/login/LoginButton';
import axios from 'axios';
import Alert from '../Alert';


function Landing() {
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [error, setError] = useState("");
    const [isDisabled, setDisabled]=useState(false);
    const navigate=useNavigate();
    const { setToken, setUser } =useContext(UserContext);

    useEffect(() => {
        const savedToken=localStorage.getItem('linkrToken')
        if(savedToken){
            setToken(savedToken);
            getUserData(savedToken);
        }
        
        return;
    }, []);

    function handleSubmit(event){
    event.preventDefault();
        if(email===""){
            setError("Please fill in your E-mail address")
        }
        else if(password===""){
            setError("Please fill in your password")
        }
        else{
        sendLogin();
        }
    }
    
    function getUserData(savedToken){
        const config =({
            headers: {
                "Authorization": `Bearer ${savedToken}`
            }
        });
        const request = axios.get(process.env.REACT_APP_API_URL + "/getuser", config)
        request.then(response=>{
        if(response.status===200){
            setUser(response.data);    
            navigate('/timeline');
            }
         })
         request.catch(err=>{
             if(err.response.status===404){
                setUser("")
                setToken("")
                localStorage.removeItem('linkrToken');
                navigate("/");
             }
             else if(err.response.status===401){
                setUser("")
                setToken("")
                localStorage.removeItem('linkrToken');
                navigate("/");
             }
         });
     };



    function sendLogin(){
       const submitObject={
            email:email,
            password:password}
        setDisabled(true);
        const request = axios.post(process.env.REACT_APP_API_URL + "/signin", submitObject)
        request.then(response=>{
            setDisabled(false);
            if(response.status===200){
            localStorage.setItem('linkrToken', response.data);
            setToken(response.data);
            getUserData(response.data);            
            navigate('/timeline');
            }
            
        })
        request.catch(err=>{
            setDisabled(false);
            if(err.response.status===401){
                setError("Invalid E-mail and password combination")
            }
            else if(err.response.status===422){
                setError(error.response.data)
            }
            else if(err.response.status===500){
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
                <LoginDiv>
                    <Form onSubmit={handleSubmit}>
                        <Field placeholder="e-mail" type="email" value={email} required onChange={e => setEmail(e.target.value)} disabled={isDisabled ? true : false} />
                        <Field placeholder="password" type="password" value={password} required onChange={e => setPassword(e.target.value)} disabled={isDisabled ? true : false} />
                        <Button type="submit" disabled={isDisabled ? true : false}>Log In</Button>
                        <Link to="/sign-up/">First time? Create an account!</Link>
                    </Form>
                </LoginDiv>
                <Alert error={error} setError={setError} />
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
export default Landing;
