var express = require('express');
var verifikasi = require('./verification')
var auth = require('./auth')
var router = express.Router()

router.post('/api/v1/register', auth.registrasi)
router.post('/api/v1/login', auth.login)

// role 1
router.get('/api/v1/rahasia', verifikasi(), auth.halamanRahasia)

module.exports = router