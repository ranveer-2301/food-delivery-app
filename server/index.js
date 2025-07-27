require('dotenv').config(); 
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
const cors = require("cors");
const express = require('express');
const { connectDB } = require('./config/db.js');
const path = require('path');
const cartRouter = require('./routes/cartRouter.js');
const { orderRouter } = require('./routes/orderRouter.js');

const userRouter = require("./routes/userRouter.js");
const itemRouter = require("./routes/itemRouter.js");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true)
    }
    else {
      callback(new Error('Not allowed by cors'))
    }
  },
  credentials : true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/items', itemRouter)

// cart Router
app.use('/api/cart', cartRouter)

// order Router
app.use('/api/orders', orderRouter)


app.get('/', (req, res) => {
  res.send('API is working!');
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Database connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server due to DB connection error');
});
