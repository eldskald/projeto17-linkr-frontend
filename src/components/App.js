import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../shared/userContext';
import GlobalStyle from '../styles/globalStyle';
import Landing from './login/Landing';
import Home from './Home';
import SignUp from './login/SignUp';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [token, setToken] = useState('');

    useEffect(() => {
        // Nothing for now, we should load token from localStorage here.
        /*const savedToken=localStorage.getItem('linkrToken')
        if(savedToken){
            
        }*/
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
