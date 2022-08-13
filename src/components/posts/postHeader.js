import styled from 'styled-components';
import axios from "axios";
import { useContext, useState } from 'react';
import UserContext from '../../shared/userContext';

const API_URL = process.env.REACT_APP_API_URL;

function PostHeader(props) {
    
    const [deleteAlert, setDeleteAlert] = useState(false)

    const { token } = useContext(UserContext);

function editPost(postId, description){

    const postOBJ = {
        description: description
    }
    
    axios.put(`edit/${postId}`, postOBJ)
        .then(res => {
            console.log('edited sucesfull')})
        .catch(err => {
            console.log("Error at Function editPost" + err.message);
        });
    return 
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

    return (
        <PostHeaderHTML>
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
                (<>     </>)}
        </PostHeaderHTML>
    );
}

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
    justify-content: space-between;
`

export default PostHeader;