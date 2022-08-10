import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import LogDiv from '../../styles/login/LoginDiv';
import Splash from './Splash';
import Field from '../../styles/login/LoginField';
import Button from '../../styles/login/LoginButton';
import axios from 'axios';


function Landing() {
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [isDisabled, setDisabled]=useState(false);
    const navigation=useNavigate();
    const { token, setToken } =useContext(UserContext);

    function handleLogin(event) {
       event.preventDefault();
       console.log("ue")
       const submitObject={
            email:email,
            password:password}
        setDisabled(true);
        const request = axios.post(process.env.REACT_APP_API_URL + "/signin", submitObject)
        request.then(response=>{
            localStorage.setItem('linkrToken', response.data);
            setToken(response.token);            
            navigation('/home')
        });
    };
    return (
        <>
            <Container>
                <Splash></Splash>
                <LogDiv>
                    <Form onSubmit={handleLogin}>
                        <Field placeholder="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Field placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <Button type="submit" onClick={handleLogin}>Log In</Button>
                        <Link to="/cadastro/">First time? Create an account!</Link>
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
export default Landing;
