const express = require('express');
const router = express.Router();

const {index, show, list, create, store, edit, update, remove, search} = require('../controllers/moviesController')

router.get('/index', index);
router.get('/list', list);
router.get('/show/:id', show);
router.get('/search', search);
router.get('/create', create);
router.post('/create', store);
router.get('/edit/:id', edit);
router.put('/edit/:id', update);

router.delete('/delete/:id', remove);


module.exports = router;