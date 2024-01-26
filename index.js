const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://gangdramma:971584440@cluster0.9qmh4zk.mongodb.net/houses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  username: String,
  password: String,
});

const House = mongoose.model('House', {
  apartmentNumber: String,
  city: String,
  cost: Number,
  photo: String,
  location: String,
  rooms: Number,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 3600000,
  },
}));

app.delete('/delete-house/:id', async (req, res) => {
  const houseId = req.params.id;

  try {
    const deletedHouse = await House.findByIdAndDelete(houseId);

    if (!deletedHouse) {
      res.status(404).json({ message: 'House not found' });
      return;
    }

    res.json({ message: 'House deleted successfully', deletedHouse });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting house', error: error.message });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});


app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});


app.post('/add-house', async (req, res) => {
  const { apartmentNumber, city, cost, photo, location, rooms } = req.body;

  try {
    const house = new House({ apartmentNumber, city, cost, photo, location, rooms });
    await house.save();
    res.json({ message: 'House added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding house' });
  }
});


app.get('/houses', async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching houses' });
  }
});

app.delete('/delete-house/:id', async (req, res) => {
  const houseId = req.params.id;

  try {
    const deletedHouse = await House.findByIdAndDelete(houseId);

    if (!deletedHouse) {
      res.status(404).json({ message: 'House not found' });
      return;
    }

    res.json({ message: 'House deleted successfully', deletedHouse });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting house', error: error.message });
  }
});


app.delete('/delete-added-house/:id', async (req, res) => {
  const houseId = req.params.id;

  try {
    const deletedHouse = await House.findByIdAndDelete(houseId);

    if (!deletedHouse) {
      res.status(404).json({ message: 'Added house not found' });
      return;
    }

    res.json({ message: 'Added house deleted successfully', deletedHouse });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting added house', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
