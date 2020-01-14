import React, { useState } from 'react'
import axios from 'react'

export const musicAxios = axios.create()

musicAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Context = React.createContext()

function ContextProvider(props) {
    const [userState, setUserState] = useState({
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || ''
    })
    const [music, setMusic] = useState([])

    const getMusic = () => {
        return musicAxios.get('/squid/add')
            .then(res => {
                setMusic(res.data)
                return res
            })
    }
    const addMusic = (newMusic) => {
        return musicAxios.post('/squid/add', newMusic)
            .then(res => {
                getStories()
                return res
            })
    }
    const editMusic = (musicId, music) => {
        return musicAxios.put(`/squid/add/${musicId}`, music)
            .then(res => {
                setMusic(prev => {
                    const updatedMusic = prev.map(music => {
                        return music._id === res.data._id ? res.data : music
                    })
                    return (updatedMusic)
                })
            })
    }
    const deleteMusic = (musicId) => {
        return musicAxios.delete(`/squid/add/${musicId}`)
            .then(res => {
                setMusic(prev => {
                    const updatedMusic = prev.filter(music => {
                        return music._id !== musicId
                    })
                    return (updatedMusic)
                })
                return res
            })
    }

    const signup = (userInfo) => {
        console.log('sign provider')
        return axios.post('/auth/signup', userInfo)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prev => ({
                    ...prev, user, token
                }))
                return response
            })
    }
    const login = (credentials) => {
        return axios.post('/auth/login', credentials)
            .then(response => {
                const { token, user } = response.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prev => ({
                    ...prev, user, token
                }))
                return response
            })
    }
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setMusic([])
        setUserState({
            user: {},
            token: ''
        })
    }

    return(
        <Context.Provider 
            value={{
                ...userState,
                music,
                getMusic,
                addMusic,
                editMusic,
                deleteMusic,
                signup,
                login,
                logout
            }}>
            { props.children }
        </Context.Provider>
    )
}

export { ContextProvider, Context }