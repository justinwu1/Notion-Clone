const router = require('express').Router()
let Page = require('../models/pages.model')

// Return all the page
router.route('/').get((req, res) => {
  Page.find({}).exec((err, result) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.status(200).json(result)
  })
})

// Add a page
router.post('/', (req, res) => {
  const googleEmail = req.body.googleEmail
  const pageData = req.body.pageData
  const title = req.body.title
  const data = { googleEmail, pageData, title }
  const page = new Page(data)
  page.save((err, result) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.status(200).json(result)
  })
})

// Return single page data
router.route('/:id').get((req, res) => {
  Page.findOne({ _id: req.params.id }).exec((err, page) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json(page)
  })
})

// Delete a Page
router.route('/:id').delete((req, res) => {
  Page.findOneAndDelete({ _id: req.params.id }).exec((err, result) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.status(200).json(result)
  })
})

// Update the data in a page
router.route('/update/:id').patch((req, res) => {
  console.log(req.body)
  const data = {
    id: req.params.id,
    pageData: req.body.pageData,
  }
  Page.findOneAndUpdate({ _id: data.id }, data, {
    returnOriginal: false,
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json(err)
    }
    console.log(result)
    res.status(200).json(result)
  })
})

module.exports = router
