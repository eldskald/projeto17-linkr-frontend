import styled from 'styled-components';

const LoginDiv = styled.div`
    width:535px;
    height:100%;
    background-color: var(--divcolor2);
    display: flex;
    align-items: center;
    justify-content:center;
    @media screen and (max-width:900px){
        width: 100%;
        height:calc(100% - 175px);
        padding: 40px 10px;
        box-sizing: border-box;
        align-items: flex-start;
    }
`;

export default LoginDiv;
