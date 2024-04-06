import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
    const [state, setState] = useState({
        username: "",
        password: "",
        successMessage: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value 
        }));
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "username": state.username,
            "password": state.password,
        };
        axios.post(API_BASE_URL + '/login', payload)
            .then(function (response) {
                if(response.status === 202){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    console.log("hello login des")
                    console.log(response.data)
                    localStorage.setItem(ACCESS_TOKEN_NAME,JSON.stringify(response.data.token));
                    redirectToHome();
                    props.showError(null)
                }
                // else if(response.code === 204){
                //     props.showError("Username and password do not match");
                // }
                else{
                    props.showError("Username does not exists");
                    console.log(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const redirectToHome = () => {
        props.updateTitle('Home');
        navigate('/home');
    }

    const redirectToRegister = () => {
        navigate('/register');
        props.updateTitle('Register');
    }

    return(
        <div style={{}}>
            <div></div>
            <div>
                <form>
                    <div>
                        <label htmlFor="Username1">Username</label>
                        <input type="text" 
                            id="username"
                            placeholder="Enter username" 
                            value={state.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                    </div>
                    <div>
                    </div>
                    <button 
                        type="submit" 
                        onClick={handleSubmitClick}
                    >Submit</button>
                </form>
                <div style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>
                <div className="registerMessage">
                    <span>Dont have an account? </span>
                    <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
