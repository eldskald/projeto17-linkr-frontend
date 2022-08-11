import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../shared/userContext';
import GlobalStyle from '../styles/globalStyle';
import Landing from './login/Landing';
import SignUp from './login/SignUp';
import Home from './posts/Home';


function App() {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
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
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
