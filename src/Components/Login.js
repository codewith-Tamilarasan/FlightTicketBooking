    // Login.js

    import React, { useState } from 'react';
    import axios from 'axios';
    import { useAuth } from './Authentication';
    import { useNavigate } from 'react-router';
    import Home from './Home';

    const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('user');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const authenticate = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        let apiUrl = 'http://localhost:3000/userlogin';

        if (type === 'admin') {
            apiUrl = 'http://localhost:3000/adminlogin';
        }

        const response = await axios.post(apiUrl, {
            email,
            password,
        });

        if (response.status === 200) {
            authenticate.login(type,email);
            console.log(email);
            if(type==='user')
            {
            navigate('/user-login/private');
            }

            if(type==='admin')
            {
                navigate('/admin-login/private');  
            }
            alert('Login successfully');
            console.log('Login successfully');
        } else {
            alert('Login Failed');
        }
        } catch (error) {
         alert("login failed");
        console.log('error', error);
        }

        // setEmail('');
        // setPassword('');
    };

    return (
        <div>
<div>
    <Home/>
</div>
       
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
                </label>
                <input
                className="w-full p-2 border rounded-md"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
                </label>
                <input
                className="w-full p-2 border rounded-md"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
                Login As:
                </label>
                <div className="flex">
                <button
                    className={`flex-1 py-2 px-4 rounded-md ${
                    type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                    onClick={() => setType('user')}
                    type="button"
                >
                    User
                </button>
                <button
                    className={`flex-1 py-2 px-4 rounded-md ${
                    type === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                    onClick={() => setType('admin')}
                    type="button"
                >
                    Admin
                </button>
                </div>
            </div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                type="submit"
            >
                Login
            </button>
            </form>
        </div>
        </div>
        </div>
    );
    };

    export default Login;
