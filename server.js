const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define Hospital schema
const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  task:{
    type: String,
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API endpoints
app.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    if (!hospitals) {
      return res.status(404).send('No Hospital Found');
    }
    res.status(200).send(hospitals);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting hospitals');
  }
});

app.get('/hospitals/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const hospitals = await Hospital.findById(id);
    if (!hospitals) {
      return res.status(404).send('Hospital not found');
    }
    res.status(200).send(hospitals);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting hospitals');
  }
});

app.post('/hospitals', async (req, res) => {
  try {
    const newHospital = new Hospital({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      task: req.body.task
    });
    await newHospital.save();
    res.status(201).send(newHospital);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding hospital');
  }
});

app.put('/hospitals/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedName = req.body.name;
    const updatedAddress = req.body.address;
    const updatedPhone = req.body.phone;
    const updatedTask = req.body.task;
    const hospital = await Hospital.findByIdAndUpdate(id, { name: updatedName }, {address: updatedAddress}, {phone: updatedPhone}, {task: updatedTask}, { new: true });
    if (!hospital) {
      return res.status(404).send('Hospital not found');
    }
    res.status(200).send(hospital);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating hospital');
  }
});

app.delete('/hospitals/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const hospital = await Hospital.findByIdAndDelete(id);
    if (!hospital) {
      return res.status(404).send('Hospital not found');
    }
    res.status(200).send(`Hospital ${id} deleted`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting hospital');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
