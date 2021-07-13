const router = require('express').Router()
let Page = require('../models/pages.model')

// Return all the page
router.route('/').get((req, res) => {
  Page.find()
    .then((pages) => res.json(pages))
    .catch((err) => res.status(400).json('Error' + err))
})

// Add a page
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

// Return single page data
router.route('/:id').get((req, res) => {
  Page.findById(req.params.id)
    .then((page) => res.json(page))
    .catch((err) => res.status(400).json('Error' + err))
})

// Delete a Page
router.route('/:id').delete((req, res) => {
  Page.findByIdAndDelete(req.params.id)
    .then((page) => res.json('Page deleted'))
    .catch((err) => res.status(400).json('Error' + err))
})

// Update the data in a page
router.route('/update/:id').post((req, res) => {
  Page.findById(req.params.id)
    .then((page) => {
      page.pageData = req.body.pageData

      // update &　save it to the database
      page
        .save()
        .then(() => res.json('Page Updated'))
        .catch((err) => {
          res.status(400).json('Error' + err)
        })
    })
    .catch((err) => res.status(400).json('Error' + err))
})

module.exports = router
