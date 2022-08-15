import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

const API_URL = process.env.REACT_APP_API_URL;

function TrendingHashtags() {

    const navigate = useNavigate();

    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let unmounted = false;
        const source = axios.CancelToken.source();
        setLoading(true);
        axios.get(`${API_URL}/hashtags`)
            .then(res => {
                setLoading(false);
                setHashtags(res.data);
            })
            .catch(() => {
                if (!unmounted) {
                    setLoading(false);
                    setError(true);
                }
            });
        return () => {
            unmounted = true;
            source.cancel();
        };
    }, []);

    return (
        <HashtagFeedDiv>
            <TrendingDiv>
                <h3>trending</h3>
            </TrendingDiv>
            {loading ? (
                <SpinnerWrapper>
                    <ClipLoader
                        color='var(--textcolor1)'
                        size={64}
                    />
                </SpinnerWrapper>
            ) : (
                error ? (
                    <ErroMessage>
                        <p>Error!<br/>Try again later.</p>
                    </ErroMessage>
                ) : (
                    <HashtagDiv>
                        {hashtags.map((tag, index)=>(
                            <Hashtag
                                key={index}
                                onClick={() => navigate(`/hashtag/${tag.name.slice(1)}`)}
                            >
                                {tag.name}
                            </Hashtag>
                        ))}
                    </HashtagDiv>
                )
            )}
        </HashtagFeedDiv>
    );
}

const HashtagFeedDiv = styled.div`
    background-color: var(--divcolor1);
    width: 301px;
    height: 406px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    margin: 0px 0px 0px 25px;
    font-family: var(--headerfont);
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: var(--textcolor1);
    border-radius: 16px;
    position: sticky;
    top: 94px;

    h3{
        font-size: 27px;
        padding: 0px 0px 0px 16px;
    }

    @media (max-width: 1050px) {
        display: none;
    }
`;

const TrendingDiv = styled.div`
    border-bottom: 1px solid var(--border);
    height: 17%;
    min-height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 0px 5px 0px;
`;

const HashtagDiv = styled.div`
    padding: 14px 0px 0px 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: flex-start;
`;

const Hashtag = styled.div`
    width: fit-content;
    font-size: 19px;
    font-weight: normal;
    margin: -10px 0px 0px 0px;
    color: var(--textcolor1);
    :hover{
        color: var(--contrastcolor1);
        cursor: pointer;
        transition: all 0.2s;
    }
`;

const SpinnerWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: ${props => props.loading ? 'block' : 'none'};
`;

const ErroMessage = styled.div`
    width: 100%;
    padding-top: 46px;
    text-align: center;
    font-family: var(--scriptfont);
    color: var(--contrastcolor2);
    font-size: 18px;
`;

export default TrendingHashtags;
