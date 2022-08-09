import styled, { css } from 'styled-components';

const BaseDiv = styled.div`
    width: 612px;
    height: 212px;
    
    background-color: var(--divcolor1);
    border-radius: 16px;
    padding: 16px;
    display: flex;

    ${props => props.additional && css`
        ${props.additional}
    `};
`;

export default BaseDiv;
