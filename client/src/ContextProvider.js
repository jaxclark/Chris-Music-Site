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
}