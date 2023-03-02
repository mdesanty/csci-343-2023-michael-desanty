const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.get('/', authorsController.index);
router.get('/:id', authorsController.show);
router.post('/', authorsController.create);
router.put('/:id', authorsController.update);
router.delete('/:id', authorsController.destroy);

module.exports = router;