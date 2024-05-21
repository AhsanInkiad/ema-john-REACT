import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import {addToDb, getShoppingCart} from '../../utilities/fakedb';

const Shop = () => {
    
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        const storedCart = getShoppingCart(); // object ta saved hoye gelo.

        for(const id in storedCart){
            // get the products by using Id
            const addedProduct = products.find(product => product.id==id);
            const quantity = storedCart[id];
            
           addedProduct.quantity = quantity;
           console.log(addedProduct);
            
        }
    },[products]);

    const handleAddToCart = (product) => {
        // cart.push(product); 
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
        
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <h4>Order Summary</h4>
                <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;