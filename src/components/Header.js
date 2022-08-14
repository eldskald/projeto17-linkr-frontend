import { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { IoChevronDownOutline, IoSearch } from 'react-icons/io5';
import UserContext from '../shared/userContext';

const API_URL = process.env.REACT_APP_API_URL;

function Header() {
    const navigate = useNavigate();
    const { user, setUser, setToken } = useContext(UserContext);

    const [dropdown, setDropdown] = useState(false);
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchId, setSearchId] = useState(0);

    function handleLogout() {
        setUser("");
        setToken("");
        localStorage.removeItem('linkrToken');
        navigate("/");
    }

    useEffect(() => {
        if(user===""){
            navigate("/");
        }
        return;
    }, []);

    function onSearch(string) {
        if (string === '') {
            setSearch('');
            return;
        }

        setSearchId((searchId + 1) % 1000);
        axios.get(`${API_URL}/search?str=${string}&id=${searchId}`)
            .then(res => {
                if (searchId != res.data.id) return;
                setSearchResults([...res.data.results]);
            });
        setSearch(string);
    }

    const handleBlur = useCallback((e) => {
        const currentTarget = e.currentTarget;
        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setSearching(false);
                setSearchResults([]);
                setSearch('');
            }
        });
    }, []);

    return (
        <>
            <Container>
                <Logo>
                    <Link to='/timeline'>linkr</Link>
                </Logo>
                <UserAvatar onClick={() => setDropdown(!dropdown)}>
                    <IconWrapper active={dropdown}>
                        <IoChevronDownOutline 
                            color='var(--textcolor1)'
                            size='32px'
                        />
                    </IconWrapper>
                    <AvatarImg src={user.profilePictureUrl} alt={user.name} />
                </UserAvatar>
            </Container>
            <DropdownMenu active={dropdown}>
                <div onClick={handleLogout}>
                    Logout
                </div>
            </DropdownMenu>
            <SearchBarWrapper>
                <SearchBar onBlur={handleBlur} active={searching}>
                    <WhiteBackground></WhiteBackground>
                    <SearchInputWrapper>
                        <SearchInput
                            type='search'
                            placeholder='Search for people'
                            value={search}
                            onChange={e => onSearch(e.target.value)}
                            onFocus={() => setSearching(true)}
                        />
                        <IoSearch
                            color='var(--textcolor3)'
                            size='32px'
                        />
                    </SearchInputWrapper>
                    <SearchResultsContainer>
                        {searchResults.map((user, index) => (
                            <SearchResult key={index}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.profilePictureUrl}
                                        alt={user.name}
                                    />
                                    <p>{user.name}</p>
                                </Link>
                            </SearchResult>
                        ))}
                    </SearchResultsContainer>
                </SearchBar>
            </SearchBarWrapper>
        </>
    );
}

                //    <SearchResultsContainer active={searching}>
                //        {searchResults.map((user, index) => (
                //            <SearchResult key={index}>
                //                <Link to={`/user/${user.id}`}>
                //                    <img
                //                        src={user.profilePictureUrl}
                //                        alt={user.name}
                //                    />
                //                    <p>{user.name}</p>
                //                </Link>
                //            </SearchResult>
                //        ))}
                //    </SearchResultsContainer>

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
    
    > a {
        color: inherit;
        text-decoration: none;
    }
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
    object-fit: border;
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
        transition: color 0.2s;

        :hover {
            color: var(--contrastcolor1);
        }
    }
`;

const SearchBarWrapper = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 72px;
    z-index: 3;
    padding-top: 15px;
    display: flex;
    justify-content: center;
    pointer-events: none;

    @media (max-width: 900px) {
        top: 72px;
        padding: 15px 16px 0px 16px;
    }
`;

const SearchBar = styled.div`
    position: relative;
    width: 574px;
    height: 42px;
    padding-right: 8px;
    padding-left: 16px;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--divcolor3);
    border-radius: 8px;
    border: 1px solid var(--divcolor1);
    overflow: hidden;

    ${props => (
        props.active && css`
            height:160px;
        `
    )};

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const WhiteBackground = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 42px;
    background-color: var(--divcolor4);
`;

const SearchInputWrapper = styled.div`
    width: 100%;
    min-height: 40px;
    z-index: 1;
    display: flex;
    align-items: center;
`;

const SearchInput = styled.input`
    flex-grow: 1;
    outline: none;
    border: none;
    background-color: transparent;
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--textcolor4);

    :placeholder {
        color: var(--textcolor2);
    }
`;

const SearchResultsContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    padding-top: 8px;
    display: flex;
    flex-direction: column;
`;

const SearchResult = styled.div`
    width: fit-content;
    margin: 8px 0px;
    color: var(--textcolor4);
    
    > a {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: inherit;
        text-decoration: none;

        > img {
            width: 36px;
            height: 36px;
            object-fit: border;
            border-radius: 50%;
        } 

        > p {
            color: inherit;
            margin-left: 16px;
            font-family: var(--scriptfont);
            font-size: 18px;
            transition: color 0.2s;
        }
    }
    
    :hover {
        color: var(--contrastcolor1);
    }
`;

export default Header;
