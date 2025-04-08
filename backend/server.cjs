// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes.cjs');
// const connectDB = require('./config/db.cjs'); // Import the DB connection

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to the database
// connectDB();


// // Use routes
// app.use('/api/auth', authRoutes);

// const port = process.env.PORT ;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });







// const express = require('express');
// const { MongoClient } = require('mongodb');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';
// const client = new MongoClient(mongoURI);

// app.use(express.json());

// // Connect to MongoDB
// async function connectToDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//     const db = client.db('users'); // Replace with your database name
//     usersCollection = db.collection('backend');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// }

// app.listen(PORT, async () => {
//     await connectToDB();
//     console.log(`Server running on http://localhost:${PORT}`);
//   });

// //   app.post('/api/auth/login', async (req, res) => {
// //     const { username, password } = req.body;
// //     if (!username || !password) {
// //       return res.status(400).send('Username and password are required.');
// //     }
  
// //     // try {
// //     //   const user = await usersCollection.findOne({ username });
// //     //   if (!user) {
// //     //     return res.status(401).send('Invalid credentials');
// //     //   }
  
// //     //   const isPasswordValid = await bcrypt.compare(password, user.password);
// //     //   if (!isPasswordValid) {
// //     //     return res.status(401).send('Invalid credentials');
// //     //   }
  
// //     //   // Generate JWT
// //     //   const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //     //   res.status(200).send({ message: 'Login successful', token });
// //     // } catch (error) {
// //     //   res.status(500).send({ error: 'Error logging in' });
//     // }
//   });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcryptjs'); // For password hashing
// const jwt = require('jsonwebtoken'); // For generating tokens

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Define User Schema
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// // User Model
// const User = mongoose.model('User', userSchema);

// // Routes

// // Register
// app.post('/api/auth/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if user exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: 'User already exists' });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save user
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error registering user' });
//     }
// });

// // Login
// app.post('/api/auth/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         // Check password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

//         // Generate token
//         const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });

//         res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email }, token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error logging in' });
//     }
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
//  const mongoose = require('mongoose');
//  const bodyParser = require('body-parser');
//  const cors = require('cors');
// const bcrypt = require('bcryptjs'); // For password hashing
// const jwt = require('jsonwebtoken'); // For generating tokens
// require('dotenv').config(); // Load environment variables

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/users'; // Use environment variable or default
// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit if connection fails
//   });

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // User Model
// const User = mongoose.model('User', userSchema);

// // Routes

// // Register Route
// app.post('/api/auth/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).json({ message: 'Server error while registering user' });
//   }
// });

// // Login Route
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
//       expiresIn: '1h',
//     });

//     res.status(200).json({
//       message: 'Login successful',
//       user: { name: user.name, email: user.email },
//       token,
//     });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Server error while logging in' });
//   }
// });

// // Handle undefined routes
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const authRoutes = require('./routes/authRoutes.cjs'); // Import the auth routes

// dotenv.config();  // Load environment variables
// const app = express();

// // Middleware
// app.use(cors());  // Enable CORS if needed
// app.use(bodyParser.json());  // Parse JSON bodies

// // Use the authentication routes
// app.use('/api/auth', authRoutes);  // The '/login' route will now be available at '/api/auth/login'

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // User Schema (you can modify your User model as needed)
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // Hash password before saving the user
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);  // Generate salt
//   this.password = await bcrypt.hash(this.password, salt);  // Hash the password
//   next();
// });

// // User model
// const User = mongoose.model('User', userSchema);

// // Login route to compare hashed passwords using bcrypt
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Compare the hashed password with bcrypt
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Return response with token
//     res.json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// // server.cjs
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes.cjs');  // Import the router

// dotenv.config();
// const app = express();

// app.use(bodyParser.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Database connected successfully.");
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server running on port ${process.env.PORT || 5000}`);
//     });
//   })
//   .catch((error) => console.log("Database connection error:", error));

// // Use the authRoutes router
// app.use("/api/auth", authRoutes);  // Mount the auth routes at '/api/auth'




const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Model
const User = require("./models/userModel.cjs");

// Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
