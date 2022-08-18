import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comment from './Comment';
import { IoPaperPlaneOutline } from 'react-icons/io5';

export default function CommentSection({
    expanded
}){
    return(
        <Wrapper expanded={expanded}>
            <Comment />
            <Comment />
            <MakeCommentWrapper>
                <IconWrapper>
                    <AuthorIcon
                        src={"https://tausugdelicacieshome.files.wordpress.com/2019/01/baolo.jpg"}
                        alt={"authorName"}
                    />
                </IconWrapper>
                <InputWrapper>
                    <CommentInput
                                placeholder={'write a comment'}
                                //value={"description"}
                                // onChange={e => setDescription(e.target.value)}
                                // disabled={submitting}
                            />
                    <SendButton>
                        <IoPaperPlaneOutline />
                    </SendButton>        
                </InputWrapper>
            </MakeCommentWrapper>
        </Wrapper>
    );
};

const Wrapper=styled.div`
margin-top: 20px;
width:100%;
display: ${props => props.expanded ? "flex":"none"};
flex-direction: column;
`;
const MakeCommentWrapper=styled.div`
display:flex;
justify-content: left;
width: 100%;
padding-top: 5px;
`;
const IconWrapper=styled.div`
width:82px;
display: flex;
justify-content: center;
align-items: center;
`;
const AuthorIcon = styled.img`
    cursor: pointer;
    margin-right: 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    @media (max-width: 612px) {
        width: 30px;
        height: 30px;
    }
`;
const SendButton=styled.button`
background: none;
border-style: none;
font-size:20px;
color:var(--textcolor1);
width:20px;
margin-right: 15px;
`;
const InputWrapper=styled.div`
width: calc(100% - 82px);
display: flex;
justify-content: space-between;
background-color: var(--divcolor5);
border-radius: 8px;
`;
const CommentInput = styled.textarea`
    width:100%;
    height: 40px;
    padding: 8px;
    background: none;
    border-radius: 8px;
    border: none;
    outline: none;
    resize: none;
    font-family: var(--scriptfont);
    font-size: 16px;
    color: var(--textcolor3);
    transition: all 0.2s;
    box-sizing: border-box;
    ::placeholder {
        color: var(--textcolor5);
        font-style: italic;
    }

    :disabled {
        opacity: 0.5;
    }
`;