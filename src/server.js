const express = require("express")
require('dotenv').config();
const { connectDB } = require('./config/db');
const {errorHandler} = require('./middleware/ErrorMiddleware');
const app = express();
app.use(express.json());

const PORT=8080
app.get('/', (req, res)=>{
    res.send("Handy man backend")
})
app.use(errorHandler);
connectDB(process.env.DB_URL)
   .then(()=>{
    app.listen(PORT, ()=>{
        console.log(`app running on http://localhost:${PORT}`)
    })
   })
   .catch(err => {
    console.log(err)
    console.log("Could not run the app due to database connection problems")
   }
)
   