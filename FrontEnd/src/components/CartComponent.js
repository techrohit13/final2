import React, { useEffect } from 'react';

export default function CartComponent({ cartItems, quantities, handleQuantityChange, removeFromCart, calculateTotalPrice }) {
  
  // Update local storage when cart items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [cartItems, quantities]);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="row mb-3">
              <div className="col-2">
                <img src={item.image} alt={item.name} className="img-fluid" />
              </div>
              <div className="col-6">
                <p>{item.name}</p>
              </div>
              <div className="col-2">
                <button className="btn btn-sm btn-primary mr-1" onClick={() => handleQuantityChange(index, quantities[index] - 1)}> - </button>
                <span>{quantities[index]}</span>
                <button className="btn btn-sm btn-primary ml-1" onClick={() => handleQuantityChange(index, quantities[index] + 1)}> + </button>
              </div>
              <div className="col-2">
                <p>Rs. {item.price * quantities[index]}</p>
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(index)}>Delete</button>
              </div>
            </div>
          ))}
          <hr />
          <div className="row">
            <div className="col-10 text-right">
              <h5>Total Price: Rs. {calculateTotalPrice()}</h5>
            </div>
            <div className="col-2">
              <button className="btn btn-success">Pay Now</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
