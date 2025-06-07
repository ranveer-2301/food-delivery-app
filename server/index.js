const cors = require("cors");
const express = require('express');
const { connectDB } = require('./config/db.js');
const path = require('path');

const userRouter = require("./routes/userRouter.js");
const itemRouter = require("./routes/itemRouter.js");


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

// Database connection
connectDB();

// Routes
app.use('/api/user', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/items', itemRouter)


app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
