require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const mainRouter = require("./Router/index")
const db = require('./db')

app.use(express.json());
app.use(cors());

app.use('/user', mainRouter);

app.get('/', (req,res) => {

    res.send("Hello, Krish.")
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

