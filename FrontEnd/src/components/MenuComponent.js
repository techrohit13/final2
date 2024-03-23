import React, { useState } from 'react';
import { Card, CardBody, CardImg, CardTitle, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import DishDetails from './DishdetailComponent';

export default function MenuComponent({ dishes, addToCart, isLoggedIn, userId }) {
    
    console.log(userId);
    const navigate = useNavigate();
    const [selectedDish, setSelectedDish] = useState(null);

    const onDishSelect = (dish) => {
        setSelectedDish(dish);
    }

    const handleAddToCart = async (dish) => {
        if (isLoggedIn) {
            try {
                const { name, image, price } = dish;
                const quantity = 1;
                const data = { name, image, price, quantity };
                console.log(data);
    
                const response = await fetch(`https://merngfg.onrender.com/api/cart/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if (response.ok) {
                    const cartItem = { name, image, price, quantity }; // Construct the item object
                    addToCart(cartItem); // Add this item to the cart
                    alert('Item added to cart successfully.');
                } else {
                    alert('Failed to add item to cart.');
                }
            } catch (error) {
                console.error('Error adding item to cart:', error);
                alert('An unexpected error occurred.');
            }
        } else {
            alert('Please login to add items to the cart.');
            navigate('/login');
        }
    };
    
    

    return (
        <div className="container">
            <div className="row">
                {dishes.map((dish) => {
                    return (
                        <div className="col-12 col-md-2 m-1" key={dish.id}>
                            <Card onClick={() => onDishSelect(dish)}>
                                <CardImg width="150px" height="150px" src={dish.image} alt={dish.name} />
                                <CardBody>
                                    <div>Rs. {dish.price}</div>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <Button color="primary" onClick={() => handleAddToCart(dish)}>Add to Cart</Button>
                                </CardBody>
                            </Card>
                        </div>
                    );
                })}
            </div>
            <DishDetails dish={selectedDish} />
        </div>
    );
}
