const router = require('express').Router()
let Page = require('../models/pages.model')

router.route('/').get((req, res) => {
  Page.find()
    .then((pages) => res.json(pages))
    .catch((err) => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
  const googleName = req.body.googleName
  const page = req.body.page

  const newPage = new Page({ googleName, page })

  newPage
    .save()
    .then(() => res.json('Page added!'))
    .catch((err) => res.status(400).json('Error' + err))
})

module.exports = router
