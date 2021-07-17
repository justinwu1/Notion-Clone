const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pageSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    googleEmail: {
      type: String,
    },
    pageData: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)

const Page = mongoose.model('Pages', pageSchema)

module.exports = Page
