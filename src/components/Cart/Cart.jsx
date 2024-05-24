import React from 'react';

const Cart = ({cart}) => {
    let quantity = 0;
    let totalPrice = 0;
    let totalShipping = 0;
    for(const product of cart){
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping; 

       // product.quantity = product.quantity || 1;
        quantity = quantity + product.quantity;
    }
    return (
        <div>
            <h3>Order Summary</h3>
            <h4>Selected Items: {quantity} </h4>
            <h4>Total Price: {totalPrice} </h4>
            <h4>Total Shipping: {totalShipping} </h4>
        </div>
    );
};

export default Cart;