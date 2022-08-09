import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../shared/userContext';

function Home() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
            Nothing for now
        </>
    );
}

export default Home;
