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
      unique: true,
      trim: true,
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
