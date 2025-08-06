const express = require('express');
const router = express.Router();
const modactController = require('../controllers/modactController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', modactController.getAllModacts);
router.get('/:id', modactController.getModactById);
router.get('/modulo/:idModulo', modactController.getModactsByModulo);
router.get('/actividad/:idActividad', modactController.getModactsByActividad);

// Protected routes
router.post('/', authenticate, authorize(['admin']), modactController.createModact);
router.delete('/:id', authenticate, authorize(['admin']), modactController.deleteModact);

module.exports = router;