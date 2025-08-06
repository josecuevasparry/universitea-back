const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', docenteController.getAllDocentes);
router.get('/:id', docenteController.getDocenteById);

// Protected routes
router.post('/', authenticate, authorize(['admin']), docenteController.createDocente);
router.put('/:id', authenticate, authorize(['admin']), docenteController.updateDocente);
router.delete('/:id', authenticate, authorize(['admin']), docenteController.deleteDocente);

module.exports = router;