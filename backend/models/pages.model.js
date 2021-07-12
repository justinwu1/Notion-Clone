const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pageSchema = new Schema(
  {
    googleName: {
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

const Page = mongoose.model('Exercise', pageSchema)

module.exports = Page
