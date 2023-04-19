import './Login.css'
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function submit(e) {
        e.preventDefault();
        try{
            console.log(email, password)
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <div className="login-box">
            <p>Login</p>
            <form action='POST'>
                <div className="user-box">
                    <input required name="email" type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
                        <label>Email</label>
                </div>
                <div className="user-box">
                    <input required name="password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <label>Password</label>
                </div>
                <button onClick={submit}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </button>
            </form>
            <p>Don't have an account? <a href="" className="a2">Sign up!</a></p>
        </div>
    )
}