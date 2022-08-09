import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import Header from './Header';
import BaseDiv from '../styles/baseDiv';

function Home() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Container>
                <BaseDiv></BaseDiv>
                <BaseDiv
                    additional={`
                        height: 15%;
                        background-color: var(--divcolor4);
                        margin-top: 32px;
                        border: 5px solid var(--contrastcolor1);
                    `}
                ></BaseDiv>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100%;
    padding: 100px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Home;
