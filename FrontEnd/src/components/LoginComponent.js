import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { number, password };

        try {
            const response = await fetch('https://merngfg.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();
         
            if (response.ok && responseData.accessToken) {

                // Save token and userId to local storage
                localStorage.setItem('accessToken', responseData.accessToken);
                localStorage.setItem('userId', responseData.userId); // Save userId
                // Fetch user's cart data
            const cartResponse = await fetch(`https://merngfg.onrender.com/api/cart/${responseData.userId}`);
            const cartData = await cartResponse.json();
            // Store cart items in local storage
            localStorage.setItem('cartItems', JSON.stringify(cartData));

                setIsLoggedIn(true);
                // Redirect to home page
                navigate('/menu');
            } else {
                // Handle login error
                setError(responseData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="number">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <br />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
