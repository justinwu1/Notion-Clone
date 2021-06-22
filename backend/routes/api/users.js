const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const User = require('../../models/Users')

// @route  POST api/users
// @access Public
// @desc Register User
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more charcaters'
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req)
    // There is an error
    if (!errors.isEmpty()) {
      // errors.array() will return an array of objects that contains error info
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
      // Check if user exists in the database
      let user = await User.findOne({ email })
      // Encrypt Password
      // Return jsonwebtoken
      res.send('user route')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

router.get('/')

module.exports = router
