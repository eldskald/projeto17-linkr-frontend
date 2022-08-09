import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import UserContext from '../shared/userContext';

function Header() {
    const navigate = useNavigate();
    // const { user } = useContext(UserContext);
    const user = { 
        name: 'Shiba',
        profilePicture: 'https://www.petlove.com.br/images/breeds/197837/profile/original/shiba-p.jpg?1532540015'
    };

    const [logoutDropdown, setLogoutDropdown] = useState(false);

    function LogoutDropdown({ active }) {
        return (
            <DropdownMenu style={
                {transform: (active ? 'translateY(72px)' : 'translateY(0px)')}
            }>
                <div onClick={handleLogout}>
                    Logout
                </div>
            </DropdownMenu>
        );
    }

    function handleClick() {
        setLogoutDropdown(!logoutDropdown)
    }

    function handleLogout() {
        return;
    }

    return (
        <>
            <Container>
                <Logo>linkr</Logo>
                <UserAvatar onClick={handleClick}>
                    {
                        logoutDropdown ? (
                            <IoChevronUpOutline
                                color={'var(--textcolor1)'}
                                size={'32px'}
                            />
                        ) : (
                            <IoChevronDownOutline
                                color={'var(--textcolor1)'}
                                size={'32px'}
                            />
                        )
                    }
                    <img src={user.profilePicture} alt={user.name} />
                </UserAvatar>
            </Container>
            <LogoutDropdown active={logoutDropdown} />
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

    > img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    width: 160px;
    height: 48px;
    top: 0px;
    right: 0px;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--divcolor1);
    border-radius: 0px 0px 0px 20px;
    transition: transform 2s ease-in-out;

    > div {
        cursor: pointer;
        font-family: var(--scriptfont);
        font-size: 16px;
        color: var(--textcolor1);
    }
`;

export default Header;
