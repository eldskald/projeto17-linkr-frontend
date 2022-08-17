import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import UserContext from '../../shared/userContext';
import BaseDiv from '../../styles/baseDiv';

const API_URL = process.env.REACT_APP_API_URL;

function NewPost({ reloadPosts }) {
    const { token, user } = useContext(UserContext);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        setSubmitting(true);
        axios.post(`${API_URL}/posts`,
            {
                link,
                description
            },
            { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setLink('');
                setDescription('');
                setSubmitting(false);
                reloadPosts();
            })
            .catch(err => {
                setSubmitting(false);
                setError(err.response.data);
            });
    }

    

    return (
        Object.keys(user).length === 0 ? (
            <></>
        ) : (
            <BaseDiv
                additional={`
                    margin-top: 0px;
                    margin-bottom: 32px;
                    background-color: var(--divcolor4);
                    height: auto;
                `}
            >
                <AuthorContainer>
                    <AuthorIcon
                        src={user.profilePictureUrl}
                        alt={user.name}
                    />
                </AuthorContainer>
                <ContentContainer>
                    <DivHeader>
                        What are you going to share today?
                    </DivHeader>
                    <FormContainer onSubmit={handleSubmit}>
                        <LinkInput
                            type='text'
                            placeholder='http://...'
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            disabled={submitting}
                        />
                        <DescInput
                            maxLength={255}
                            placeholder='Awesome article about #javascript'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            disabled={submitting}
                        />
                        <ButtonAndErrorWrapper>
                            <ErrorMessage active={error}>
                                {error}
                            </ErrorMessage>
                            <SubmitButton type='submit' disabled={submitting}>
                                {submitting ? (
                                    <PulseLoader
                                        color='var(--textcolor1)'
                                        size={10}
                                    />
                                ) : (
                                    <>Publish</>
                                )}
                            </SubmitButton>
                        </ButtonAndErrorWrapper>
                    </FormContainer>
                </ContentContainer>
            </BaseDiv>
        )
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

const DivHeader = styled.div`
    margin-top: 8px;
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--textcolor4);
`;

const FormContainer = styled.form`
    flex-grow: 1;
    width: 100%;
`;

const LinkInput = styled.input`
    width: 100%;
    height: 32px;
    margin-top: 8px;

    padding-left: 8px;
    background-color: var(--divcolor3);
    border-radius: 4px;
    border: none;
    outline: none;
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

const DescInput = styled.textarea`
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

const ButtonAndErrorWrapper = styled.div`
    margin-top: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const SubmitButton = styled.button`
    width: 128px;
    height: 32px;

    background-color: var(--contrastcolor1);
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-family: var(--scriptfont);
    font-size: 16px;
    font-weight: 700;
    color: var(--textcolor1);

    :disabled {
        cursor: default;
    }
`;

const ErrorMessage = styled.div`
    font-family: var(--scriptfont);
    font-size: 16px;
    color: var(--contrastcolor2);
    transition: all 0.2s;
    opacity: ${props => props.active ? '1' : '0'};
`;

export default NewPost;
