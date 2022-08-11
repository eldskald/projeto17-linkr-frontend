import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';

const OPENGRAPH_APPID = '80c13249-bbcf-4714-afc1-8fd627672531'

function LinkPreview({ link }) {
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const encoded = encodeURIComponent(link);
        axios.get(`https://opengraph.io/api/1.1/site/${encoded}?app_id=${OPENGRAPH_APPID}`)
            .then(res => {
                setLoading(false);
                setPreview(res.data.hybridGraph);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, []);

    return (
        <Container href={link} target={'_blank'}>
            { loading ? (
                <SpinnerWrapper>
                    <PulseLoader
                        color={'var(--contrastcolor1)'}
                        size={20}
                    />
                </SpinnerWrapper>
            ) : (
                error ? (
                    <ErrorMessage>
                        <p>{link}</p>
                    </ErrorMessage>
                ) : (
                    <>
                        <InfoWrapper>
                            <InfoTitle>{preview.title}</InfoTitle>
                            <InfoDescription>{preview.description}</InfoDescription>
                            <LinkWrapper>{link}</LinkWrapper>
                        </InfoWrapper>
                        <ImgWrapper src={preview.image} alt='thumbnail' />
                    </>
               )
            )}
        </Container>
    );
}

const Container = styled.a`
    margin-top: 16px;
    width: 100%;
    height: 180px;

    display: flex;

    border: 2px solid var(--divcolor2);
    border-radius: 16px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;

    :hover {
        border: 2px solid var(--divcolor3);
    }
`;

const SpinnerWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImgWrapper = styled.img`
    height: 100%;
    aspect-ratio: 1;
    border-radius: 0px 16px 16px 0px;
    object-fit: cover;
`;

const InfoWrapper = styled.div`
    height: 100%;
    flex-grow: 1;

    padding: 16px 0px 16px 16px;
    display: flex;
    flex-direction: column;
`;

const InfoTitle = styled.div`
    width: 100%;
    margin-bottom: 16px;
    
    font-family: var(--scriptfont);
    font-size: 16px;
    color: var(--textcolor2);
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const InfoDescription = styled.div`
    width: 100%;
    flex-grow: 1;

    font-family: var(--scriptfont);
    font-size: 14px;
    color: var(--textcolor3);
    text-overflow: ellipsis;
    overflow: hidden;
`;

const LinkWrapper = styled.div`
    width: 100%;

    display: -webkit-box;
    font-family: var(--scriptfont);
    font-size: 16px;
    color: var(--textcolor2);
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-orient: vertical;
`;

const ErrorMessage = styled.div`
    width: 100%;
    heigh: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    > p {
        font-family: var(--scriptfont);
        font-size: var(16px);
        color: var(--textcolor2);
    }
`;

export default LinkPreview;
