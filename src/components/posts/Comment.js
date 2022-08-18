import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Comment(){

    const navigate = useNavigate();
    return(
        <CommentWrapper>
            <IconWrapper>
                <AuthorIcon
                    onClick={() => navigate(`/user/${"7"}`)}
                    src={"https://tausugdelicacieshome.files.wordpress.com/2019/01/baolo.jpg"}
                    alt={"authorName"}
                />
            </IconWrapper>
            <ContentWrapper>
                <AuthorName>
                    <p onClick={() => navigate(`/user/${"7"}`)}>{"authorName"}</p>
                </AuthorName>
                <Description>
                    {"COMENTÁRIO"}
                </Description>
            </ContentWrapper>
        </CommentWrapper>
    );
}
const CommentWrapper=styled.div`
display:flex;
justify-content: left;
padding-bottom:10px;
margin-bottom: 10px;
border-style: solid;
border-width: 0 0 2px 0;
border-color:var(--divcolor5) ;

`;
const IconWrapper=styled.div`
width:82px;
display: flex;
justify-content: center;
align-items: center;
`;
const ContentWrapper=styled.div`
display: flex;
flex-direction: column;

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
const AuthorName = styled.div`
    font-family: var(--scriptfont);
    font-size: 14px;
    font-weight: 700;
    color: var(--textcolor1);
    display: flex;
    > p {
        cursor: pointer;
        color:inherit;
        :hover {
            color: var(--contrastcolor1);
        }
    }
`;
const Description = styled.div`
    margin-top: 8px;
    font-family: var(--scriptfont);
    font-size: 14px;
    color: var(--textcolor2);
`;