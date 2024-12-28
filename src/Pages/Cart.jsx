// Cart.jsx
import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import './CSS/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Your cart is empty</h2>
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="item-price">{item.price} DT/Month</p>
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                    disabled={(item.quantity || 1) <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity || 1}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="remove-btn"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <div className="total">
                    <span>Total:</span>
                    <span>{calculateTotal()} DT/Month</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default Cart;