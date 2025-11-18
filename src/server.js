const express = require("express")
const cookieParser = require('cookie-parser')
const {connectDB} = require('./config/db');
connectDB();

const app = express()
const PORT=8080

// routes 

const adminRoutes = require('./routes/AdminRoutes');
const userRoutes = require('./routes/UserRoutes');

app.use(express.json());
app.use(cookieParser());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res)=>{
    res.send("Handy man backend")
})

app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})