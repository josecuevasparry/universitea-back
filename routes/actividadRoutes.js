const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', actividadController.getAllActividades);
router.get('/:id', actividadController.getActividadById);
router.get('/next/:id', actividadController.getActividadById);

// Protected routes
router.post('/', authenticate, authorize(['admin']), actividadController.createActividad);
router.put('/:id', authenticate, authorize(['admin']), actividadController.updateActividad);
router.delete('/:id', authenticate, authorize(['admin']), actividadController.deleteActividad);

module.exports = router;