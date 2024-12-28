// Item.jsx
import React from 'react';
import './Item.css';
import { useCart } from '../../Context/CartContext';

const Item = ({ image, name, price, id }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, image, price });
  };

  return (
    <div className="item">
      <div className="item-image">
        <img 
          src={image} 
          alt={name} 
          className="course-image"
          style={{ objectFit: 'contain', maxWidth: '80%', maxHeight: '80%' }} // Added inline styles
        />
      </div>
      <div className="item-info">
        <h3 className="course-name">{name}</h3>
        <p className="course-price">{price} DT/ Month</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default Item;