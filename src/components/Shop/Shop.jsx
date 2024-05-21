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
        const savedCart = [];
        for(const id in storedCart){
            // get the products by using Id
            const addedProduct = products.find(product => product.id==id);
            const quantity = storedCart[id];
            if(addedProduct){
                addedProduct.quantity = quantity;
               
                savedCart.push(addedProduct);
            }
            
           
            
        }
        setCart(savedCart);
        console.log(cart);
    },[products]);

    const handleAddToCart = (product) => {
        // cart.push(product); 
        let newCart = [];
        const exists = cart.find(pd => pd.id==product.id);
        if(!exists){
            product.quantity=1;
            newCart=[...cart, product];
        } else {
            exists.quantity = exists.quantity+1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
        
    }

    let quantity = 0;
    for(const product of cart){
       // product.quantity = product.quantity || 1;
        quantity = quantity + product.quantity;
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
                <p>Selected Items: {quantity}</p>
            </div>
        </div>
    );
};

export default Shop;