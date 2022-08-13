import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../shared/userContext';
import GlobalStyle from '../styles/globalStyle';
import Hashtag from './hashtags/Hashtag';
import Landing from './login/Landing';
import SignUp from './login/SignUp';
import Home from './posts/Home';
import PostsByUser from './posts/PostsByUser'
import HashtagPage from './hashtags/HashtagPage';


function App() {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{
                token, setToken, user, setUser
            }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/sign-up' element={<SignUp />} />
                        <Route path='/timeline' element={<Home />} />
                        <Route path='/hashtag/:hashtag' element={<HashtagPage/>} />
                        <Route path='/user/:userId' element={<PostsByUser />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
