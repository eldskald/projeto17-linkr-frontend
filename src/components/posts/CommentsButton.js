import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import ReactDOMServer from 'react-dom/server';
import { AiOutlineComment } from 'react-icons/ai';

function CommentsButton({ expanded, setComments, totalComments, loadComments, loading }) {    

    function handleClick() {
        if (expanded) {
            setComments(null);
        }
        if(!expanded){
            loadComments();
        }        
    }

    return (
        <>
            <Container>
                <Button
                    data-tip={ReactDOMServer.renderToString(
                        <TooltipDiv>
                            {expanded ? 'Hide comments' : 'Show comments'}
                        </TooltipDiv>
                    )}
                    data-html={true}
                    onClick={handleClick}
                    disabled={loading}
                >
                    <AiOutlineComment
                        color='var(--textcolor1)'
                        size={24}
                    />
                </Button>
                    <p>{totalComments} comments</p>
                <ReactTooltip
                    place='bottom'
                    backgroundColor='transparent'
                />
            </Container>
        </>
    );
}

const Container=styled.div`
    margin:20px 16px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        white-space: nowrap;
        margin-top: 8px;
        font-family:var(--scriptfont);
        color:var(--textcolor1);
        font-size: 11px;
    }
`;

const Button=styled.button`
    background:none;
    border-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        transform: scale(1.3);
    }
    :disabled {
        opacity: 0.5;
    }
`;

const TooltipDiv=styled.div`
    padding: 8px;
    border-radius: 8px;
    background-color: var(--divcolor4);
    font-family: var(--scriptfont);
    font-size: 14px;
    color: var(--textcolor4);
`;

export default CommentsButton;
