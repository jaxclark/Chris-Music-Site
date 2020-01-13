import React, { useState, useContext } from './node_modules/react'
import { Context } from '../ContextProvider'
import '../styling/authStyles.scss'

export default function Login() {
    const { login } = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError] = useState('')

    const handleChange = e => {
        const { name, value } = e.target
        if(name === 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }
    const clearInputs = () => {
        setUsername('')
        setPassword('')
        setError('')
    }
    const handleSubmit = e => {
        e.preventDefault()
        login({username, password})
            .then(() => {})
            .catch(err => {
                console.log(err)
                setError(err.response.data.message)
            })
            clearInputs()
    }

    return(
        <div className='login'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className='loginDiv'>
                    <h2>Log In</h2>
                    <input 
                        onChange={handleChange}
                        value={username}
                        name='username'
                        placeholder='username'
                        type="text"/>
                    <input 
                        onChange={handleChange}
                        value={password}
                        name='password'
                        placeholder='password'
                        type='password'/>
                    <button>Submit</button>
                </div>
            </form>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    )
}