import React from 'react';
import styled from 'styled-components';
import BaseDiv from '../../styles/baseDiv';
import LikeButton from './LikeButton';
import LinkPreview from './LinkPreview';
import { useNavigate } from 'react-router-dom';

function Post({
    authorName, authorPicture, description, liked, likes, metadata,postId
}) {
    const navigate = useNavigate();
    function handleClickHashtag(hashtag) {
        navigate(`/hashtag/${hashtag}`);
    }
    
    function parseDescription(text) {
        let arr = text.split(' ');
        arr = arr.map((word, index) => {
            const regex = /^\#[a-zA-Z0-9_]+$/;
            if (regex.test(word)) {
                const hashtag = word.replace('#', '');
                return (
                    <Hashtag
                        key={index}
                        onClick={() => handleClickHashtag(hashtag)}
                    >
                        {`${word} `}
                    </Hashtag>
                );
            } else {
                return (
                    <span key={index}>
                        {`${word} `}
                    </span>
                )
            }
        });
        return arr;
    }



    return (
        <BaseDiv
            additional={`
                height: auto;
            `}
        >
            <AuthorContainer>
                <AuthorIcon src={authorPicture} alt={authorName} />
                <LikeButton likes={likes} liked={liked} postId={postId} />
            </AuthorContainer>
            <ContentContainer>
                <AuthorName>{authorName}</AuthorName>
                <Description>
                    {parseDescription(description)}
                </Description>
                <LinkPreview metadata={metadata} />
            </ContentContainer>
        </BaseDiv>
    );
}

const AuthorContainer = styled.div`
    height: 100%;

    padding: 16px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentContainer = styled.div`
    height: 100%;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
`;

const AuthorIcon = styled.img`
    margin-right: 16px;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    @media (max-width: 612px) {
        width: 40px;
        height: 40px;
    }
`;

const AuthorName = styled.div`
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--textcolor1);
`;

const Description = styled.div`
    margin-top: 8px;
    font-family: var(--scriptfont);
    font-size: 18px;
    color: var(--textcolor2);
`;

const Hashtag = styled.span`
    font-weight: 700;
    color: var(--textcolor1);
    cursor: pointer;
`;

export default Post;
