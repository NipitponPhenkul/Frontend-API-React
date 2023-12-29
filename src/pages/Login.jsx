import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import Config from '../config';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(Config.api + '/api/User/Login', {usr: userName, pwd: password}).then(res => {
            if (res.data.message === 'success') {
                localStorage.setItem('token', res.data.token);
                navigate('/home');
            }
        }).catch(err => {
            throw err.response.data;
        })
        } catch (e) {
            Swal.fire({
                title: 'error',
                message: e.message,
                icon: 'error'
            })
        }
        
    }
    return (
        <>

            <div class="login-box container mt-5">
                <div class="login-logo">
                    <b>POS Project</b>
                </div>

                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={handleLogin}>
                            <div class="input-group mb-3">
                                <input onChange={e => setUserName(e.target.value)} class="form-control" placeholder="Username" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input onChange={e => setPassword(e.target.value)} type="password" class="form-control" placeholder="Password" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-8">
                                    <div class="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>

                                <div class="col-4">
                                    <button onClick={handleLogin} type="submit" class="btn btn-primary btn-block">Sign In</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login;