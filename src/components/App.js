import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../shared/userContext';
import GlobalStyle from '../styles/globalStyle';
import Home from './login/Home';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [token, setToken] = useState('');

    useEffect(() => {
        // Nothing for now, we should load token from localStorage here.
        return;
    }, []);

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{
                token, setToken
            }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
