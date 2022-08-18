import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BaseDiv from '../../styles/baseDiv';
import Alert from '../Alert';
import LikeButton from './LikeButton';
import RepostButton from './RespostButton';
import CommentsButton from './CommentsButton';
import LinkPreview from './LinkPreview';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../shared/userContext';
import { RiEdit2Fill } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { BiRepost } from "react-icons/bi";
import CommentSection from './CommentSection';

const API_URL = process.env.REACT_APP_API_URL;

function Post({
    postId,
    userId,
    authorId, 
    authorName, 
    authorPicture, 
    description, 
    liked, 
    likes,
    metadata, 
    reloadFeed, 
    reposts,
    reposterName,
    reposterId,
    commentCount
}) {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const [comments, setComments] = useState(false);
    const [totalComments, setTotalComments] = useState(commentCount);
    const [editing, setEditing] = useState(false);
    const [newDesc, setNewDesc] = useState(description);
    const [deleting, setDeleting] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);

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

    function handleEdit() {
        setSubmitting(true);
        axios.put(`${API_URL}/edit/${postId}`,
            {
                description: newDesc
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setSubmitting(false);
                setEditing(false);
                reloadFeed();
            })
            .catch(() => {
                setMessage('Error! Try again later.');
                setSubmitting(false);
                setEditing(false);
            })
    }

    function handleDelete() {
        setSubmitting(true);
        axios.delete(`${API_URL}/delete/${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setSubmitting(false);
                setDeleting(false);
                reloadFeed();
            })
            .catch(() => {
                setMessage('Error! Try again later.');
                setSubmitting(false);
                setDeleting(false);
            })
    }
    function loadComments(){
        axios.get(`${API_URL}/comments/${postId}?limit=10&offset=0`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setComments([...res.data.comments]);
            setTotalComments(res.data.commentsTotal);
        })
        .catch(err => {
            // setLoading('');
            setMessage(err.response.data);
            console.log(err);
        });
    }

    return (
        <> 
            <BaseDiv
                additional={`
                    height: auto;
                    margin: 0px 0px 32px 0px;
                    flex-direction: column;
                `}>
                {reposterName ? <ReposterTitle><BiRepost/><h1> Reposted By <b>{` ${reposterName}`}</b></h1></ReposterTitle>:''}
                <ContainerWrapper>
                    <AuthorContainer>
                        <AuthorIcon
                            onClick={() => navigate(`/user/${authorId}`)}
                            src={authorPicture}
                            alt={authorName}
                        />
                        <LikeButton
                            likes={likes}
                            liked={liked}
                            postId={postId} />
                        <RepostButton
                            reposts={reposts}
                            postId={postId} />                        
                        <CommentsButton                         
                            expanded={!!comments}               
                            setComments={setComments}           
                            totalComments={totalComments}       
                            loadComments={loadComments}
                            loading={loadingComments} />
                    </AuthorContainer>
                    <ContentContainer>
                        <AuthorName>
                            <p onClick={() => navigate(`/user/${authorId}`)}>{authorName}</p>
                            { authorId === userId ? (
                                <ButtonsContainer expanded={editing}>
                                    { editing ? (
                                        <ButtonWrapper onClick={() => handleEdit()}>
                                            <IoSend/>
                                        </ButtonWrapper>
                                    ) : (
                                        <></>
                                    )}
                                    <ButtonWrapper onClick={() => setEditing(!editing)}>
                                        <RiEdit2Fill/>
                                    </ButtonWrapper>
                                    <ButtonWrapper onClick={() => setDeleting(!deleting)}>
                                        <FaTrash/>
                                    </ButtonWrapper>
                                </ButtonsContainer>
                            ) : (<></>)}
                        </AuthorName>
                        { editing ? (
                            <EditInput
                                maxLength={255}
                                placeholder='New description'
                                value={newDesc}
                                onChange={e => setNewDesc(e.target.value)}
                                disabled={submitting}
                            />
                        ) : (
                            <Description>
                                {parseDescription(description)}
                            </Description>
                        )}
                        <LinkPreview metadata={metadata} />
                    </ContentContainer>
                </ContainerWrapper>
                <CommentSection 
                    expanded={!!comments} 
                    comments={comments}
                    postId={postId}
                    setComments={setComments}
                    setTotalComments={setTotalComments}
                    originalAuthor={authorId}
                    loadComments={loadComments}
                    loading={loadingComments}
                />
            </BaseDiv>
            <Alert error={message} setError={setMessage} button={true} />
            { deleting ? (
                <DeletePopupBackground>
                    <DeletePopup>
                        <p>Are you sure you want<br/>to delete this post?</p>
                        <div>
                            <CancelButton onClick={() => setDeleting(false)}>
                                <p>No, go back</p>
                            </CancelButton>
                            <DeleteButton onClick={handleDelete}>
                                <p>Yes, delete it</p>
                            </DeleteButton>
                        </div>
                    </DeletePopup>
                </DeletePopupBackground>
            ) : (<></>)}
        </>
    );
}
const ContainerWrapper = styled.div`
display: flex;
`;
const ReposterTitle=styled.div`
color:var(--textcolor1);

margin-bottom:10px;
display: flex;
align-items: center;
svg{
    font-size: 20px;
}
h1{
    font-family: var(--scriptfont);
    font-size: 13px;
}
b{
    font-weight: 700;
}
`;

const AuthorContainer = styled.div`
    height: 100%;
    width: fit-content;
    padding: 16px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const AuthorIcon = styled.img`
    cursor: pointer;
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
    display: flex;
    justify-content: space-between;


    > p {
        cursor: pointer;
        color:inherit;
        :hover {
            color: var(--contrastcolor1);
        }
    }
`;

const ButtonsContainer = styled.div`
    width: ${props => props.expanded ? "78px" : "52px" };
    display: flex;
    justify-content: space-between;
`;

const ButtonWrapper = styled.div`
    color: var(--textcolor1);
    cursor: pointer;
    :hover {
        color: var(--contrastcolor1);
        transition: all 0.2s;
    }
`;

const Description = styled.div`
    margin-top: 8px;
    font-family: var(--scriptfont);
    font-size: 18px;
    color: var(--textcolor2);
`;

const EditInput = styled.textarea`
    width: 100%;
    height: 88px;
    margin-top: 8px;

    padding: 8px;
    background-color: var(--divcolor3);
    border-radius: 4px;
    border: none;
    outline: none;
    resize: none;
    font-family: var(--scriptfont);
    font-size: 16px;
    color: var(--textcolor4);
    transition: all 0.2s;

    :placeholder {
        color: var(--textcolor3);
    }

    :disabled {
        opacity: 0.5;
    }
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

const DeletePopupBackground = styled.div`
    background: rgba(0, 0, 0, 0.25);
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeletePopup = styled.div`
    opacity: 1;
    border-radius: 16px;
    background: var(--divcolor1);
    box-sizing: border-box;
    padding: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;

    > p {
        font-family: var(--scriptfont);
        color: var(--textcolor1);
        text-align: center;
        font-size: 25px;
    }

    > div {
        margin-top: 32px;
        display: flex;
        justify-content: space-around;
    }
`;

const DeleteButton = styled.div`
    padding: 12px 36px;
    background-color: var(--contrastcolor1);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > p {
        font-family: var(--scriptfont);
        color: var(--textcolor1);
        font-size: 20px;
    }
`;

const CancelButton = styled.div`
    margin: 0px 32px;
    padding: 12px 36px;
    background-color: var(--divcolor4);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > p {
        font-family: var(--scriptfont);
        color: var(--contrastcolor1);
        font-size: 20px;
    }
`;

export default Post;
