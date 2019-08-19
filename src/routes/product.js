'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductController');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);


//teste com module.exports
// router.post('/', controller.metodoPost);
// router.put('/:id', controller.metodoPut);
// router.delete('/', controller.metodoDelete);


module.exports = router;