import { useState, useContext, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
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

    return (
        <>
            <Container>
                <Logo>linkr</Logo>
                <SearchBar>
                    <SearchResultsContainer active={searching}>
                        {searchResults.map((user, index) => (
                            <SearchResult key={index}>
                                <img
                                    src={user.profilePictureUrl}
                                    alt={user.name}
                                />
                                <Link to={`/user/${user.id}`}><p>{user.name}</p></Link>
                            </SearchResult>
                        ))}
                    </SearchResultsContainer>
                    <SearchInput
                        type='search'
                        placeholder='Search for people'
                        value={search}
                        onChange={e => onSearch(e.target.value)}
                        onFocus={() => setSearching(true)}
                        onBlur={() => {
                            setSearching(false);
                            setSearchResults([]);
                            setSearch('');
                        }}
                    />
                    <IoSearch
                        color='var(--textcolor3)'
                        size='32px'
                    />
                </SearchBar>
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
    }
`;

const SearchBar = styled.div`
    position: relative;
    width: 576px;
    height: 42px;
    padding-right: 8px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    background-color: var(--divcolor4);
    border-radius: 8px;

    ${props => (
        props.active && css`
            border-radius: 8px 8px 0px 0px;
        `
    )};
`;

const SearchInput = styled.input`
    flex-grow: 1;
    outline: none;
    border: none;
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--textcolor4);

    :placeholder {
        color: var(--textcolor2);
    }
`;

const SearchResultsContainer = styled.div`
    position: absolute;
    top: 34px;
    left: 0px;
    z-index: -1;
    width: 576px;    
    height: 0px;
    display: flex;
    flex-direction: column;
    background-color: var(--divcolor3);
    overflow: hidden;
    border-radius: 0px 0px 8px 8px;
    transition: all 0.2s;
    
    ${props => (
        props.active && css`
            height: 136px;
            padding: 16px;
        `
    )};
`;

const SearchResult = styled.div`
    margin: 8px 0px;
    display: flex;
    align-items: center;
    
    > img {
        width: 36px;
        height: 36px;
        object-fit: border;
        border-radius: 50%;
    } 

    > p {
        margin-left: 16px;
        font-family: var(--scriptfont);
        font-size: 18px;
        color: var(--textcolor4);
    }
`;

export default Header;
