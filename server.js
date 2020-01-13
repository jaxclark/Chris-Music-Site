const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressJwt = require('express-jwt')
const path = require('path')
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use('/auth', require('./routes/auth'))
app.use('/squid', expressJwt({ secret: process.env.SECRET}))
app.use('/squid/add', require('./routes/add'))

app.use((err, req, res) => {
    console.log(err)
    if(err.name === 'UnathorizedError') {
        res.status(err.status)
    }
    return res.send({ message: err.message })
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chris-music-site',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false   
    },
    (err) => {
        if(err) throw err;
        console.log('Connected to the database')
    }
)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
})