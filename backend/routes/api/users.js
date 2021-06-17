const express = require('express')
const router = express.Router()

// @route  POST api/users
// @access Public
// @desc Register User
router.post('/', (req, res) => {
  res.send('user route')
})

module.exports = router
