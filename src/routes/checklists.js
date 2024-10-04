const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checklistController = require('../controllers/checklistController');

router.post('/', auth, checklistController.createChecklist);
router.get('/', auth, checklistController.getChecklists);
router.get('/:checklistId', auth, checklistController.getChecklist);
router.delete('/:checklistId', auth, checklistController.deleteChecklist);

module.exports = router;