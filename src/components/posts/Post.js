import styled from 'styled-components';
import BaseDiv from '../../styles/baseDiv';
import LinkPreview from './LinkPreview';
import axios from "axios";
import { useContext } from 'react';
import UserContext from '../../shared/userContext';

const API_URL = process.env.REACT_APP_API_URL;

function Post({
    userId, authorId, authorName, authorPicture, description, liked, likesTotal, metadata
}) {
    
    const { token } = useContext(UserContext);

    function handleClickHashtag(hashtag) {
        return;
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

    function editPost(){
        console.log('editPost')
        return 
    }

    function deletePost(){
        console.log('deletePost')
        console.log('API_URL :', API_URL)
        axios.delete(`${API_URL}/delete/2`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log('tentou deletar com sucesso ')})
            .catch(err => {
                console.log("Error at Function deletePost" + err.message);
            });
            return
        }

    return (
        <BaseDiv
            additional={`
                height: auto;
            `}
        >
            <AuthorContainer>
                <AuthorIcon src={authorPicture} alt={authorName} />
            </AuthorContainer>
            <ContentContainer>
                <PostHeader>
                    <AuthorName>{authorName}</AuthorName>
                    {(authorId === userId)?
                        (<TesteEdition>
                            <ion-icon   name="create-outline" 
                                        onClick={() => editPost()}>
                                </ion-icon>
                            <ion-icon   name="trash-outline"
                                        onClick={() => deletePost()}>
                                </ion-icon>
                        </TesteEdition>): (<></>)}
                </PostHeader>
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

const TesteEdition = styled.div`
    display: flex;
    ion-icon{
        color: white;
        margin-left: 5px;
        font-size: 20px;
    }
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

export default Post;
