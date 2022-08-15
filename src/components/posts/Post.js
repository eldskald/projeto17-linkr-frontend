import styled from 'styled-components';
import BaseDiv from '../../styles/baseDiv';
import LikeButton from './LikeButton';
import LinkPreview from './LinkPreview';
import { useNavigate,Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../shared/userContext';
import PostHeader from './postHeader';


function Post({
    postId, userId, authorId, authorName, authorPicture, description, liked, likesTotal, metadata
}) {
    const navigate = useNavigate();

    function handleClickHashtag(hashtag) {
        navigate(`/hashtag/${hashtag}`);
    }
    
    const { token } = useContext(UserContext);

    return (
        <BaseDiv
            additional={`
                height: auto;
                margin: 0px 0px 32px 0px;
            `}>

            <AuthorContainer>
                <Link to={`/user/${authorId}`}>
                    <AuthorIcon src={authorPicture} alt={authorName} />
                </Link>
                <LikeButton likes={likes} liked={liked} postId={postId} />
            </AuthorContainer>
            <ContentContainer>
                <AuthorName><Link to={`/user/${authorId}`}>{authorName}</Link></AuthorName>
                <Description>
                    {parseDescription(description)}
                </Description>
                <PostHeader postId={postId}
                            authorName={authorName}
                            authorId={authorId}
                            userId={userId}
                            description={description}/>
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
    transition: color 0.2s;

    > a {
        text-decoration: none;
        color:inherit;
    }

    :hover {
        color: var(--contrastcolor1);
    }
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
    transition: color 0.2s;

    :hover {
        color: var(--contrastcolor1);
    }
`;

export default Post;
