import styled from 'styled-components';

function Splash() {
    return (
        <>
            <Container>
                <Content>
                    <Logo>linkr</Logo>
                    <Slogan>
                        save, share and discover <br />
                        the best links on the web
                    </Slogan>
                </Content>
            </Container>
        </>
    );
}

const Container = styled.div`
    width:calc(100% - 535px);
    height:100%;
    background-color: var(--divcolor1);
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width:600px){
        width:100%;
        height: 175px;
    }
`;
const Content = styled.div`

`;
const Logo = styled.h1`
font-family: var(--displayfont);
font-style: normal;
font-weight: 700;
font-size: 106px;
color:var(--textcolor1);
@media screen and (max-width:600px){
    font-size:76px;        
}
`;
const Slogan = styled.h2`
font-family: var(--headerfont);
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 64px;
color:var(--textcolor1);
@media screen and (max-width:600px){
    font-size: 23px;
    line-height: 34px;
}
`;

export default Splash;
