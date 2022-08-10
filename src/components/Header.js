import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { IoChevronDownOutline, IoPersonCircleOutline } from 'react-icons/io5';
import UserContext from '../shared/userContext';

function Header() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [dropdown, setDropdown] = useState(false);

    function handleLogout() {
        return;
    }

    function handleLogin() {
        navigate('/');
    }

    return (
        <>
            <Container>
                <Logo>linkr</Logo>
                <UserAvatar onClick={() => setDropdown(!dropdown)}>
                    <IconWrapper active={dropdown}>
                        <IoChevronDownOutline 
                            color={'var(--textcolor1)'}
                            size={'32px'}
                        />
                    </IconWrapper>
                    { Object.keys(user).length > 0 ? (
                        <AvatarImg src={user.profilePicture} alt={user.name} />
                    ) : (
                        <IoPersonCircleOutline
                            color={'var(--textcolor1)'}
                            size={'42px'}
                        />
                    )}
                </UserAvatar>
            </Container>
            <DropdownMenu active={dropdown}>
                { Object.keys(user).length > 0 ? (
                    <div onClick={handleLogout}>
                        Logout
                    </div>
                ) : (
                    <div onClick={handleLogin}>
                        Login
                    </div>
                )}
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
        font-weight: 700;
        color: var(--textcolor1);
    }
`;

export default Header;
