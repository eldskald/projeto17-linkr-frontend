import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { IoChevronDownOutline } from 'react-icons/io5';
import UserContext from '../shared/userContext';

function Header() {
    const navigate = useNavigate();
    const { user,setUser,setToken } = useContext(UserContext);

    const [logoutDropdown, setLogoutDropdown] = useState(false);

    function handleLogout() {
        setUser("")
        setToken("")
        localStorage.removeItem('linkrToken');
        navigate("/");
    }

    return (
        <>
            <Container>
                <Logo>linkr</Logo>
                <UserAvatar onClick={() => setLogoutDropdown(!logoutDropdown)}>
                   <IconWrapper active={logoutDropdown}>
                        <IoChevronDownOutline 
                            color={'var(--textcolor1)'}
                            size={'32px'}
                        />
                    </IconWrapper>
                    <AvatarImg src={user.profilePictureUrl} alt={user.name} />
                </UserAvatar>
            </Container>
            <DropdownMenu active={logoutDropdown}>
                <div onClick={handleLogout}>
                    Logout
                </div>
            </DropdownMenu>
        </>
    );
}

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 72px;
    top: 0px;
    left: 0px;
    z-index: 2;

    padding: 0px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: var(--divcolor1);
`;

const Logo = styled.div`
    font-family: var(--displayfont);
    font-size: 48px;
    font-weight: 700;
    color: var(--logocolor);
`;

const UserAvatar = styled.div`
    width: 96px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

const AvatarImg = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 50%;
`;

const IconWrapper = styled.div`
    transition: transform 0.2s;
    
    ${(props) => (
        props.active && css`
            transform: rotate(-180deg);
        `
    )};
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    width: 160px;
    height: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--divcolor1);
    border-radius: 0px 0px 0px 20px;
    transition: transform 0.2s;

    ${(props) => (
        props.active && css`
            transform: translateY(72px);
        `
    )};

    > div {
        cursor: pointer;
        font-family: var(--scriptfont);
        font-size: 16px;
        color: var(--textcolor1);
    }
`;

export default Header;
