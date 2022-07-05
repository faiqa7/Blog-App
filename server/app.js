const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 8000
const cors = require('cors')
const path = require('path')


mongoose.connect('mongodb://localhost/blog').then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}).catch(err => {
    console.log(err)
})


require('./Blog');

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./api'))