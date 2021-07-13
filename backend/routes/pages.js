const router = require('express').Router()
let Page = require('../models/pages.model')

router.route('/').get((req, res) => {
  Page.find()
    .then((pages) => res.json(pages))
    .catch((err) => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
  const googleEmail = req.body.googleEmail
  const pageData = req.body.pageData
  console.log(pageData)
  const newPage = new Page({ googleEmail, pageData })

  newPage
    .save()
    .then(() => res.json('Page added!'))
    .catch((err) => res.status(400).json('Error' + err))
})

module.exports = router
