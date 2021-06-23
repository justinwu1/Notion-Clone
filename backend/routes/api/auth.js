const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
// @route  GET api/Auth
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Sever error')
  }
})

// POST api/auth
// Authenticate user & get tokens
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
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

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      // Compare user credentials
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
