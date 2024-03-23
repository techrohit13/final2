import React, { useState, useEffect } from 'react';
import Home from "./components/HomeComponent";
import About from "./components/AboutComponent";
import Contact from "./components/ContactComponent";
import Menu from './components/MenuComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Login from './components/LoginComponent';
import Signup from './components/SignupComponent';
import Logout from './components/LogoutComponent';
import Cart from './components/CartComponent';
import Profile from './components/ProfileComponent';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('https://merngfg.onrender.com/getdishes');
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchDishes();
    
    // Check if user is logged in (e.g., by checking the presence of JWT token)
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if (token) {
      setIsLoggedIn(true);
      setUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    const fetchCartItems = async () => {
        console.log("Fetching cart items...");
        if (isLoggedIn) {
            try {
                const response = await fetch(`https://merngfg.onrender.com/api/cart/${userId}`);
                if (response.ok) {
                    const cartData = await response.json();
                    console.log("Cart data:", cartData);
                    setCartItems(cartData);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    fetchCartItems();
}, [isLoggedIn, userId]);

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    updateQuantities(updatedCartItems);
  };

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    updateQuantities(updatedCartItems);
  };

  const updateQuantities = (items) => {
    const updatedQuantities = {};
    items.forEach((item, index) => {
      updatedQuantities[index] = quantities[index] || 1;
    });
    setQuantities(updatedQuantities);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedQuantities = { ...quantities, [index]: quantity };
    setQuantities(updatedQuantities);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0);
  };

  return (
    <Router>
      <div className="App">
        <Header cartItems={cartItems.length} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="main-content">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            <Route exact path='/menu' element={<Menu dishes={dishes} addToCart={addToCart} isLoggedIn={isLoggedIn} userId={userId} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} quantities={quantities} handleQuantityChange={handleQuantityChange} removeFromCart={removeFromCart} calculateTotalPrice={calculateTotalPrice} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
