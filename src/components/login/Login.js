import React, { useState, useEffect } from 'react';
// MUI Core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './LoginStyle.module.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // clear the error on key press
    useEffect(() => {
        const keyPressHandler = () => {
            setError('');
        }

        document.addEventListener('keydown', keyPressHandler);
        return () => {
            document.removeEventListener('keydown', keyPressHandler);
        };
    }, []);



    const initiateLogin = async (e) => {
        setError('');
        e.preventDefault();
        const URL = "http://localhost:5000/user/login"

        try {
            const res = await Axios.post(URL, { email: email, password: password }, { headers: { 'Content-Type': 'application/json' } });
            if (typeof res.data != "object") {
                console.log(res.data);
                setError(res.data);
            } else {
                if (res.statusText === "Created") {
                    console.log("user created")
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="App">
            <div className="Login">
                <TextField
                    variant="standard"
                    placeholder="Email"
                    margin="normal"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <TextField
                    variant="standard"
                    placeholder="Password"
                    margin="normal"
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <h6>{error ? error : null}</h6>
                <div className="Button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => initiateLogin(e)}
                    >
                        Log In
                    </Button>
                    <h6>Don't have an account? <Link to="/register"><span>Register</span></Link></h6>
                </div>
            </div>
        </div>
    )
}
export default Login;