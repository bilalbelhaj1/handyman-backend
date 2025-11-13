const express = require("express")
const {errorHandler} = require('./middleware/ErrorMiddleware');
const app = express();
app.use(express.json());

const PORT=8080
app.get('/', (req, res)=>{
    res.send("Handy man backend")
})

app.use(errorHandler);
app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})