import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import {addToDb, getShoppingCart} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';

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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;