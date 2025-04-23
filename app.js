
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

const createUser = async () => {
  try {
    const user = new User({
      name: 'Shrey Mehta',
      email: '23it061@charusat.edu.in',
      age: 20,
    });
    const savedUser = await user.save();
    console.log('User saved:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const fetchUsers = async () => {
  try {
    const users = await User.find();
    console.log('All Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


const startApp = async () => {
  await connectDB();

  await createUser();

  await fetchUsers();
};

startApp();
