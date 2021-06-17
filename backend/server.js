const express = require('express')
const connectDB = require('./config/db')
const app = express()

//C Connect database
connectDB()

app.use(expres.json({ extended: false }))

app.get('/', (req, res) => res.send('API running'))

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000 // Default 5000 or heroku port

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
