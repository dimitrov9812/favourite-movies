import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '../login/LoginStyle.module.css';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
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
        const URL = "http://localhost:5000/user/register"

        try {
            const res = await Axios.post(URL, {username: username, email: email, password: password}, {headers: {'Content-Type':'application/json'}});
            if(typeof res.data != "object") {
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
                    placeholder="Username"
                    margin="normal"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
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
                <h6>{error? error : null}</h6>
                <div className="Button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => initiateLogin(e)}
                    >
                        Register
                    </Button>
                    <h6>Already have an account? <Link to="/login"><span>Login</span></Link></h6>
                </div>
            </div>
        </div>
    )
}

export default Register;