const express = require('express');
const router = express.Router();

const {show} = require('../controllers/actorsController')

router.get('/show/:id', show);



module.exports = router;