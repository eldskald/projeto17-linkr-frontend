import styled, { css } from 'styled-components';
import { ReactTagify } from "react-tagify";
import { useNavigate } from 'react-router-dom';

export default function Hashtag(props){

    const navigate = useNavigate();

    return(
        <ReactTagify colors={'var(--textcolor1)'} tagClicked={(tag)=> navigate(`/hashtag/${tag.slice(1)}`)}>
            <HashtagName>
                {props.hashtag}
            </HashtagName>
        </ReactTagify>
    )
}

const HashtagName = styled.h4`
    font-size: 19px;
    font-weight: normal;
    margin: -10px 0px 0px 0px;
    :hover{
        color: var(--border);
        transition: 1s;
        cursor: pointer;
    }
`