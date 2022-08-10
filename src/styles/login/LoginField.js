import styled, { css } from 'styled-components';

const Field = styled.input`
width:430px;
height: 65px;
background: var(--inputbg);
border-radius: 6px;
border-style: none;

font-style: normal;
font-weight: 700;
font-size: 27px;
line-height: 40px;
font-family: var(--headerfont);
box-sizing: border-box;
padding: 0px 17px;
margin-bottom: 13px;
@media screen and (max-width:600px){
    width:calc(100% - 20px);
}
`;

export default Field;