import styled, { css } from 'styled-components';
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";


export default function HashtagFeed(){

    const navigate = useNavigate();

    const hashtagData = [
        {name: "#teste"},
        {name: "#teste2"},
        {name: "#teste3"},
        {name: "#teste4"},
        {name: "#teste5"},
        {name: "#teste6"},
        {name: "#teste7"},
        {name: "#teste8"},
        {name: "#teste9"},
        {name: "#teste10"}
    ]

    return(
        <HashtagFeedDiv>
            <TrendingDiv>
                <h3>trending</h3>
            </TrendingDiv>
            <HashtagDiv>
                {hashtagData.map((h)=>(
                    <ReactTagify colors={'var(--textcolor1)'} tagClicked={(tag)=> navigate(`/hashtag/${tag}`)}>
                    <HashtagName>
                        {h.name}
                    </HashtagName>
                    </ReactTagify>
                ))}
            </HashtagDiv>
        </HashtagFeedDiv>
    )
}
const HashtagFeedDiv = styled.div`
    background-color: var(--divcolor1);
    width: 301px;
    height: 406px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    margin: 220px 0px 0px 25px;
    font-family: var(--headerfont);
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: var(--textcolor1);
    position: sticky;
    top: 10px;
    right: 70px;
    border-radius: 16px;
    h3{
        font-size: 27px;
        padding: 0px 0px 0px 16px;
    }

    @media (max-width: 1050px) {
        display: none;
    }
`;

const TrendingDiv = styled.div`
    border-bottom: 1px solid var(--border);
    height: 17%;
    min-height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 0px 5px 0px;
`
const HashtagDiv = styled.div`
    padding: 0px 0px 0px 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: center;
`
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
