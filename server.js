const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/products', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
  index: { type: Number, unique: true }, // Убедитесь, что это уникальное поле
  name: String,
  category: String,
  description: String,
  price: Number,
  image: String,
});

const Item = mongoose.model('Item', itemSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  orders: [
    {
      name: String,
      category: String,
      price: Number,
      quantity: Number,
      index: Number // добавляем индекс
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/items', async (req, res) => {
  try {
    const items = req.body;
    await Item.insertMany(items);
    res.status(201).send('Items added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ success: true, message: 'Login completed', username: user.username });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect email or password' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { username, orders, total } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const newOrder = new Order({
      username: user.username,
      email: user.email,
      orders,
      total
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: 'The order has been placed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
