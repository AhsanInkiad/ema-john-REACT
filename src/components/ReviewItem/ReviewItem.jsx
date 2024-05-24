import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({product, handleRemoveFromCart}) => {
    const {id, img, price, name, quantity} = product;
    return (
        <div className='review-item'>
           <img src={img} alt="" />
           <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orange-text'>${price}</span></p>
                <p>Order quantity: <span className='orange-text'>{quantity}</span> </p>
           </div>
           <button onClick={()=>handleRemoveFromCart(id)} className='d-btn'>Delete</button>
        </div>
    );
};

export default ReviewItem;