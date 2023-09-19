/*eslint-disable*/
const connectToMongo = require('./db.js');
const express = require('express')

connectToMongo()
const app = express()
const port = 3000

//                    request, response
// app.get('/api/login', (req, res) => {
//   res.send('lol')
// })
//middleware. We use "app.use" for middleware
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})
