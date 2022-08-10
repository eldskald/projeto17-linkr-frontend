import { createGlobalStyle } from 'styled-components';
import reset from 'react-style-reset';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Oswald:wght@200;300;400;500;600;700&family=Passion+One:wght@400;700;900&display=swap');
    ${reset};

    :root {
        --displayfont: 'Passion One', cursive;
        --headerfont: 'Oswald', sans-serif;
        --scriptfont: 'Lato', sans-serif;
        --logocolor: #ffffff;
        --contrastcolor1: #1877f2;
        --contrastcolor2: #ac0000;
        --divcolor1: #171717;
        --divcolor2: #4d4d4d;
        --divcolor3: #efefef;
        --divcolor4: #ffffff;
        --textcolor1: #ffffff;
        --textcolor2: #b7b7b7;
        --textcolor3: #9b9b9b;
        --textcolor4: #707070;
        --bgcolor: #333333;
        --inputbg: #ffffff;
        --buttonbg: #1877F2;

    }

    * {
        box-sizing: border-box;
    }

    #root {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: var(--bgcolor);
    }
`;

export default GlobalStyle;
