const { Item, Checklist } = require('../models');

exports.createItem = async (req, res) => {
  try {
    const checklist = await Checklist.findOne({ 
      where: { id: req.params.checklistId, UserId: req.user.id } 
    });
    if (!checklist) {
      return res.status(404).json({ msg: 'Checklist not found' });
    }

    const newItem = await Item.create({
      itemName: req.body.itemName,
      ChecklistId: req.params.checklistId,
    });

    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getItems = async (req, res) => {
    try {
        const { checklistId } = req.params;

        const checklist = await Checklist.findOne({
            where: { id: checklistId, UserId: req.user.id }
        });
        if (!checklist) {
            return res.status(404).json({ msg: 'Checklist not found' });
        }

        const items = await Item.findAll({
            where: { ChecklistId: checklistId }
        });

        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.getItem = async (req, res) => {
    try {
        const item = await Item.findOne({
        where: { ChecklistId: req.params.checklistId, id: req.params.itemId },
        include: [{
            model: Checklist,
            where: { UserId: req.user.id },
            attributes: []
        }]
        });
        if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateItem = async (req, res) => {
  try {
    let item = await Item.findOne({
      where: { id: req.params.itemId },
      include: [{
        model: Checklist,
        where: { UserId: req.user.id },
        attributes: []
      }]
    });
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    item.itemName = req.body.itemName || item.itemName;
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateItemStatus = async (req, res) => {
  try {
    let item = await Item.findOne({
      where: { id: req.params.itemId },
      include: [{
        model: Checklist,
        where: { UserId: req.user.id },
        attributes: []
      }]
    });
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    item.completed = req.body.completed;
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: { id: req.params.itemId },
      include: [{
        model: Checklist,
        where: { UserId: req.user.id },
        attributes: []
      }]
    });
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    await item.destroy();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};