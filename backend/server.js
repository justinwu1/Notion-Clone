const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

// Cors
app.use(cors())

// body parser middleware(validate data so we can pass data into req.body)
app.use(express.json({ extended: false }))

const uri = process.env.ATLAS_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('MongoDB database connection established succssfully')
})

const pageRouter = require('./routes/pages')

app.use('/pages', pageRouter)

app.get('/', (req, res) => res.send('API running'))

const PORT = process.env.PORT || 5000 // Default 5000 or heroku port

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
