import styled from 'styled-components';
import axios from "axios";
import { useContext, useState } from 'react';
import UserContext from '../../shared/userContext';

const API_URL = process.env.REACT_APP_API_URL;

function PostHeader(props) {

    const [editando, setEditando] = useState(false)
    const [editedDescription, setEditedDescription] = useState(props.description)
    const [deleteAlert, setDeleteAlert] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const { token } = useContext(UserContext);

    function editPost(){
        console.log('setEditando')
        setEditando(!editando)
        return 
    }

    function submitEdition(postId, description ) {

        const postOBJ = {
            description: description
        }

        const headers = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        console.log(`${API_URL}/edit/${postId}`)
        console.log('submitEdition : ')
        console.log('postId, description : ',  postId, description)

        
        axios.put(`${API_URL}/edit/${postId}`,
            {
                description: description
            },
            {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(res => {
                console.log('edited sucesfull : res ', res.message)})
            .catch(err => {
                    console.log("Error at Function submitEdition" + err.message);
                });

    }

    function deletePost(){
    console.log('deletePost, postId : ', props.postId)

    axios.delete(`${API_URL}/delete/${props.postId}`,
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
    }

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

    function editon(){
        
        return
    }

    return (
        <PostHeaderHTML>
            <DivTeste>
                <AuthorName>{props.authorName}</AuthorName>
                {(props.authorId === props.userId)?
                    (<Edition>
                        <ion-icon   name="create-outline" 
                                    onClick={() => editPost()}>
                            </ion-icon>
                        <ion-icon   name="trash-outline"
                                    onClick={() => deletePost()}>
                            </ion-icon>
                    </Edition>)
                    : 
                    (<Edition>     </Edition>)}
            </DivTeste>
            {(editando)?
                <>
                    <DescInput
                        maxLength={255}
                        placeholder='Awesome article about #javascript'
                        value={editedDescription}
                        onChange={e => setEditedDescription(e.target.value)}
                        disabled={submitting}
                    /> 
                    <button type='button' onClick={() => submitEdition(props.postId, editedDescription)}>submit</button>                  
                </>
                :
                <Description>
                    {parseDescription(props.description)}
                </Description>}
        </PostHeaderHTML>
    );
}

// const EnterButton = styled.button`
//     /* visibility: hidden; */
// `

const DescInput = styled.textarea`
    width: 100%;
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

const AuthorName = styled.div`
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--textcolor1);
`;

const Edition = styled.div`
    display: flex;
    ion-icon{
        color: white;
        margin-left: 5px;
        font-size: 20px;
    }
`;

const PostHeaderHTML = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: green; */
`
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
const DivTeste = styled.span`
    display: flex;
    justify-content: space-between;
    /* background-color: blue; */
`;

export default PostHeader;