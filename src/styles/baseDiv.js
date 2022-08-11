import styled, { css } from 'styled-components';

const BaseDiv = styled.div`
    margin: 16px 0px;
    width: 612px;
    height: 212px;
    
    background-color: var(--divcolor1);
    border-radius: 16px;
    padding: 16px;
    display: flex;

    @media (max-width: 612px) {
        width: 100%;
        border-radius: 0px;
    }

    ${props => props.additional && css`
        ${props.additional}
    `};
`;

export default BaseDiv;
