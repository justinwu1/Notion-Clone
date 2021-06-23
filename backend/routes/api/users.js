const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
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

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exist' }] })
      }

      user = new User({ name, email, password })
      // Encrypt Password with bcrypt and salt.
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()
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
