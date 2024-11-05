import React, { useEffect, useState } from 'react';

const UserOrders = ({ username }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${username}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (username) {
      fetchOrders();
    }
  }, [username]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Order #{index + 1}</p>
              <p>Total: {order.total}$</p>
              <p>Items:</p>
              <ul>
                {order.orders.map((item, itemIndex) => (
                  <li key={itemIndex}>{item.name} - {item.price}$</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrders;
