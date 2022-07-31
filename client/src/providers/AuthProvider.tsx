import {Route, Routes, useNavigate} from "react-router-dom";
import React, {createContext, ReactNode, useEffect, useState} from "react";
import {api} from "../api/api";
import SignIn from "../components/SignIn";
import Register from "../components/Register";

interface Example {
    max?: number,
    result?: number
}

interface IProfile {
    id?: number,
    name?: string,
    email?: string,
    example?: Example
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthProviderContext = createContext<IProfile>({});
const AuthProvider = ({children}: IAuthProvider) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('token', token);
        if (!token) return navigate('/login')
        api.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setUser(res.data)
                navigate('/')
            }).catch(e => {
                if (window.location.pathname != '/register') {
                    navigate('login')
                }
            })
    }, [token])

    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        api.post('/login', data)
            .then(res => {
                setToken(res.data.token)
                navigate('/')
            }).catch(e => {
                errorMessage(e.response.data.message)
            })

    };
    const register = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        api.post('/register', data)
            .then(res => {
                setToken(res.data.token)
                navigate('/')
            }).catch(e => {

            })
    };
    const errorMessage = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }
    return (
        <AuthProviderContext.Provider value={user}>
            <Routes>
                <Route path={'/'} element={children}/>
                <Route path={'/login'} element={<SignIn method={login} message={message}/>}/>
                <Route path={'/register'} element={<Register method={register} message={message}/>}/>
            </Routes>
        </AuthProviderContext.Provider>
    )
}

export {
    AuthProvider
}