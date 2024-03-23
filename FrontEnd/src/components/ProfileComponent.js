import React, { useState, useEffect } from 'react';

export default function ProfileComponent() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

    console.log(userId);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`https://merngfg.onrender.com/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <h3>Orders</h3>
            <ul>
                {user.orders.map((order, index) => (
                    <li key={index}>
                        <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                        <p>Total Price: Rs. {order.totalPrice}</p>
                        <p>Order Status: {order.orderStatus}</p>
                        <ul>
                            {order.items.map((item, i) => (
                                <li key={i}>
                                    <p>Item: {item.name}</p>
                                    <p>Price: Rs. {item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
