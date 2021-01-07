const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config').get(process.env.NODE_ENV)
const SALT_I = 10

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    maxlength: 100
  },
  lastname: {
    type: String,
    maxlength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
})

userSchema.pre('save', function(next) {
  let user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function(candidatePassword, callBack) {
  let user = this
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) return callBack(err)
    callBack(null, isMatch)
  })
}

userSchema.methods.generateToken = function(callBack) {
  let user = this
  const token = jwt.sign(user._id.toHexString(), config.SECRET)

  user.token = token
  user.save((err, user) => {
    if (err) return callBack(err)
    callBack(null, user)
  })
}

userSchema.statics.findByToken = function(token, callBack) {
  let user = this

  jwt.verify(token, config.SECRET, (err, decode) => {
    if (err) return console.log(err)
    console.log(decode)
    user.findOne({'_id': decode, 'token': token}, (err, user) => {
      if (err) return callBack(err)
      callBack(null, user)
    })
  })
}

userSchema.methods.deleteToken = function(token, callBack) {
  let user = this

  user.updateOne({$unset: {token: 1}}, (err, user) => {
    if (err) return callBack(err)
    callBack(null, user)
  })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
