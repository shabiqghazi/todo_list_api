const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const itemController = require('../controllers/itemController');

router.get('/', auth, itemController.getItems);
router.post('/', auth, itemController.createItem);
router.get('/:itemId', auth, itemController.getItem);
router.put('/rename/:itemId', auth, itemController.updateItem);
router.put('/:itemId', auth, itemController.updateItemStatus);
router.delete('/:itemId', auth, itemController.deleteItem);

module.exports = router;