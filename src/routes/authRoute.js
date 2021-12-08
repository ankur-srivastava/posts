const passport = require('passport')
const express = require('express')
const router = express.Router()

const authController = require('../controller/authController')

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/secrets',
  passport.authenticate('google', { session: false }),
  authController.googleLogin
  );
router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router
