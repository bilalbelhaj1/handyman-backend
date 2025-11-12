const express = require("express")
const cookieParser = require('cookie-parser');

const app = express()
const PORT=8080

app.use(cookieParser());
app.get('/', (req, res)=>{
    res.send("Handy man backend")
})

app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})