import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import Header from './Header';
import Post from './posts/Post';

function Home() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Container>
                <TitleWrapper>timeline</TitleWrapper>
                <Post
                    authorName={'Juvenal Juvêncio'}
                    authorPicture={'https://nyc3.digitaloceanspaces.com/memecreator-cdn/media/__processed__/ead/template-hide-the-pain-harold-938-0c6db91aec9c.jpeg'}
                    description={'Muito ruim, sabe nada de #react meu cachorro sabe mais #frontend que esse link'}
                />
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100%;
    padding: 72px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleWrapper = styled.div`
    width: 612px;
    height: 64px;
    margin-top: 64px;
    
    font-family: var(--headerfont);
    font-weight: 700;
    font-size: 42px;
    color: var(--textcolor1);

    @media (max-width: 612px) {
        width: 100%;
        padding-left: 32px;
        margin-top: 32px;
    }
`;

export default Home;
