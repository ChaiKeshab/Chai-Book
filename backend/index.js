/*eslint-disable*/
const connectToMongo = require('./db.js');
const express = require('express')
const { query } = require('express-validator');

connectToMongo()
const app = express()
const port = 3000

//middleware
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})
