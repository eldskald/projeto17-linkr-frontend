import styled from 'styled-components';

const Button = styled.button`
width:430px;
height: 65px;
background:var(--buttonbg);
color:var(--textcolor1);
font-family: var(--headerfont);
font-style: normal;
font-weight: 700;
font-size: 27px;
border-radius: 6px;
border-style: none;
box-sizing: border-box;
margin-bottom: 13px;
cursor: pointer;
:disabled{
    background: var(--disabledbutton);
}
@media screen and (max-width:900px){
    width:calc(100% - 20px);
}
`;

export default Button;
