const express = require('express')
const router = express.Router()

// models
const { Book } = require('../models/book')

// middleware
const { auth } = require('../middleware/auth')

// routes
/* router.route() -> will execute .get() || .post() || .patch() || .deleet() */
router.route('/book')
.get((req, res) => {
  // localhost/api/books/book?id=sdflkgjsdflkdfgjkhd
  let id = req.query.id

  Book
  .find({_id: id})
  .populate('ownerId', 'name lastname')  // only pass id, name, lastname
  .exec((err, doc) => {
    if (err) return res.status(400).send(err)
    res.send(...doc)
  })
  /* Book.find({_id: id}, (err, doc) => {
    if (err) return res.status(400).send(err)
    res.send(...doc)
  }) */
})
/* .post(), .patch() and .delete() -> check if the user is authenticated -> put the middleware */
.post(auth, (req, res) => {
  const book = new Book({
    ...req.body,
    ownerId: req.user._id
  })

  book.save((err, doc) => {
    if (err) return res.status(400).send(err)
    res.status(200).json({
      post: true,
      bookId: doc._id
    })
  })
})
.patch(auth, (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
    if (err) return res.status(400).send(err)
    res.json({
      success: true,
      doc
    })
  })
})
.delete(auth, (req, res) => {
  let id = req.query.id

  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err)
    res.json({
      success: true,
      messages: 'deleted'
    })
  })
})

// route 'all books'
router.route('/all_books')
.get((req, res) => {
  // localhost/api/books/all_books?skip=1&limit=2&order=asc&owner=jsdfsdfjsdlk

  /* if not providing skip(parameter), default will be 0 */
  let skip = req.query.skip ? parseInt(req.query.skip) : 0
  /* if not providing limit(parameter), default will be 50 */
  let limit = req.query.limit ? parseInt(req.query.limit) : 50
  /* if not providing order(parameter), default will be ascending */
  let order = req.query.order ? req.query.order : 'asc'
  /* if have owner id, find owner by owner id (equal to the ownerId) */
  let byOwner = req.query.owner ? {ownerId: req.query.owner} : {}

  Book
  .find()  // byOwner is an object, don't send an object again
  .skip(skip)
  .sort({_id: order})  // sort by id
  .limit(limit)
  .exec((err, doc) => {
    if (err) return res.status(400).send(err)
    res.send(doc)
  })
})


module.exports = router
