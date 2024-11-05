import React, { useState } from 'react';
import { FaShoppingBasket } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Order from './order'; 

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const { orders, isLoggedIn, username, onLogout, onClearCart, onDelete } = props;  
  const navigate = useNavigate();

  const suma = orders.reduce((total, el) => total + Number.parseFloat(el.price) * el.quantity, 0);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      navigate('/login');  
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          orders,
          total: suma,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Order successfully placed!');
        setCartOpen(false);
        onClearCart();  
      } else {
        alert('Error while placing your order');
      }
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  return (
    <header>
      <div>
        <span className='logo'>Usein Gvozd</span>
        <ul className='nav'>
          <li><Link to="/">Shoes</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
          <li><Link to="/about">About us</Link></li>
          
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <li>
              Hello, {username}!
              <button onClick={onLogout} style={{ marginLeft: '15px', cursor: 'pointer' }}>Log out</button>
            </li>
          )}
        </ul>
        
        <FaShoppingBasket
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen && 'active'}`}
        />
        {cartOpen && (
          <div className='shop-cart'>
            {orders.length > 0 ? (
              <>
                {orders.map((el) => (
                  <Order onDelete={onDelete} key={el.index} item={el} /> // Изменено на el.index
                ))}
                <p className='suma'>Total: {suma}$</p>
                <button onClick={handleCheckout} className="checkout-btn"> 
                  Place an order
                </button>
              </>
            ) : (
              <p className="empty-cart-message">Ваша корзина пуста 😢</p>
            )}
          </div>
        )}
      </div>
      <div className='presentation'></div>
    </header>
  );
}
