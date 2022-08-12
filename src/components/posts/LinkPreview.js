import styled from 'styled-components';

function LinkPreview({ metadata }) {
    return (
        <Container href={metadata.url}>
            <InfoWrapper>
                <InfoTitle>{metadata.title}</InfoTitle>
                <InfoDescription>{metadata.description}</InfoDescription>
                <LinkWrapper>{metadata.url}</LinkWrapper>
            </InfoWrapper>
            <ImgWrapper src={metadata.image} alt='thumbnail' />
        </Container>
    );
}

const Container = styled.a`
    margin-top: 16px;
    width: 100%;
    height: 180px;

    display: flex;

    border: 2px solid var(--divcolor2);
    border-radius: 16px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;

    :hover {
        border: 2px solid var(--divcolor3);
    }
`;

const ImgWrapper = styled.img`
    height: 100%;
    aspect-ratio: 1;
    border-radius: 0px 16px 16px 0px;
    object-fit: cover;
`;

const InfoWrapper = styled.div`
    height: 100%;
    flex-grow: 1;

    padding: 16px 0px 16px 16px;
    display: flex;
    flex-direction: column;
`;

const InfoTitle = styled.div`
    width: 100%;
    margin-bottom: 16px;
    
    font-family: var(--scriptfont);
    font-size: 16px;
    color: var(--textcolor2);
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const InfoDescription = styled.div`
    width: 100%;
    flex-grow: 1;

    font-family: var(--scriptfont);
    font-size: 14px;
    color: var(--textcolor3);
    text-overflow: ellipsis;
    overflow: hidden;
`;

const LinkWrapper = styled.div`
    width: 100%;

    display: -webkit-box;
    font-family: var(--scriptfont);
    font-size: 16px;
    color: var(--textcolor2);
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-orient: vertical;
`;

export default LinkPreview;
