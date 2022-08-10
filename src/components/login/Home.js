import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../shared/userContext';
import LogDiv from '../../styles/login/LoginDiv';
import Splash from './Splash';
import Field from '../../styles/login/LoginField';
import Button from '../../styles/login/LoginButton';


function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [isDisabled, setDisabled]=useState(false);
    const navigation=useNavigate();
    const { header, user} =useContext(UserContext);
    function handleLogin() {
       
    };
    

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <Splash></Splash>
                <LogDiv>
                    <Form onSubmit={handleLogin}>
                        <Field placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                        <Field placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <Button type="submit">Log In</Button>
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
`;

export default Home;
