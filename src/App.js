import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Items from "./Components/Items";
import Categories from "./Components/Categories"; 
import ShowFullItem from "./Components/ShowFullItem";
import Contacts from "./Components/Contacts";  
import AboutUs from "./Components/AboutUs";    
import Login from "./Components/Login"; 
import Register from "./Components/Register"; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      curentItems: [],
      items: [], 
      showFullItem: false,
      fullItem: {},
      isLoggedIn: false,
      username: '',
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setUsername = this.setUsername.bind(this); 
    this.placeOrder = this.placeOrder.bind(this); 
    this.onClearCart = this.onClearCart.bind(this);  
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000/api/items'); 
      const data = await response.json();
      this.setState({ items: data, curentItems: data });
    } catch (error) {
      console.error('Error while retrieving data:', error);
    }
  }

  handleLogin() {
    this.setState({ isLoggedIn: true });
  }

  setUsername(username) {
    this.setState({ username }); 
  }

  handleLogout() {
    this.setState({ 
      isLoggedIn: false, 
      username: '' 
    });
  }

  async placeOrder() {
    if (!this.state.isLoggedIn) {
      alert('You need to log in to place an order.');
      return;
    }

    const orderData = {
      username: this.state.username,
      orders: this.state.orders,
      total: this.state.orders.reduce((total, el) => total + el.price * el.quantity, 0)
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your purchase!😊');
        this.onClearCart();  
      } else {
        alert('Error while placing your order: ' + data.message);
      }
    } catch (error) {
      console.error('Error while placing your order:', error);
      alert('Server error, please try again later.');
    }
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header 
            orders={this.state.orders} 
            onDelete={this.deleteOrder} 
            isLoggedIn={this.state.isLoggedIn} 
            username={this.state.username} 
            onLogout={this.handleLogout}
            placeOrder={this.placeOrder}
            onClearCart={this.onClearCart}  
          />
          <Routes>
            <Route path="/" element={
              <>
                <Categories chooseCategory={this.chooseCategory} />
                <Items 
                  onShowItem={this.onShowItem} 
                  items={this.state.curentItems} 
                  onAdd={this.addToOrder} 
                />
                {this.state.showFullItem && (
                  <ShowFullItem 
                    onAdd={this.addToOrder} 
                    onShowItem={this.onShowItem} 
                    item={this.state.fullItem} 
                  />
                )}
              </>
            } />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login setToken={this.handleLogin} setUsername={this.setUsername} />} /> 
            <Route path="/register" element={<Register />} /> 
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }

  onClearCart() {
    this.setState({ orders: [] });
  }

  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ showFullItem: !this.state.showFullItem });
  }

  chooseCategory(category) {
    if (category === 'All') {
      this.setState({ curentItems: this.state.items });
      return;
    }

    this.setState({
      curentItems: this.state.items.filter(el => el.category === category)
    });
  }

  deleteOrder(index) {
    this.setState({ orders: this.state.orders.filter(el => el.index !== index) }); // Изменено с el.id на el.index
  }

  addToOrder(item) {
    this.setState((prevState) => {
      const existingOrder = prevState.orders.find(el => el.index === item.index); // Изменено с el.id на el.index
      if (existingOrder) {
        // Увеличиваем количество, если товар уже в корзине
        return {
          orders: prevState.orders.map(el => 
            el.index === item.index ? { ...el, quantity: el.quantity + 1 } : el // Изменено с el.id на el.index
          )
        };
      } else {
        // Добавляем новый товар с количеством 1
        return {
          orders: [...prevState.orders, { ...item, quantity: 1 }]
        };
      }
    });
  }
}

export default App;
