const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})

module.exports = router

/* const navigateTo = url => {
  history.pushState(null, null, url);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  })
}); */
