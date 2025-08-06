const express = require('express');
const router = express.Router();
const moduloController = require('../controllers/moduloController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', moduloController.getAllModulos);
router.get('/:id', moduloController.getModuloById);

// Protected routes
router.post('/', authenticate, authorize(['admin']), moduloController.createModulo);
router.put('/:id', authenticate, authorize(['admin']), moduloController.updateModulo);
router.delete('/:id', authenticate, authorize(['admin']), moduloController.deleteModulo);

module.exports = router;