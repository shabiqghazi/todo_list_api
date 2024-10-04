const { Checklist } = require('../models');

exports.createChecklist = async (req, res) => {
  try {
    const newChecklist = await Checklist.create({
      name: req.body.name,
      UserId: req.user.id,
    });

    res.json(newChecklist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.findAll({ where: { UserId: req.user.id } });
    res.json(checklists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findOne({ 
      where: { id: req.params.checklistId, UserId: req.user.id } 
    });
    if (!checklist) {
      return res.status(404).json({ msg: 'Checklist not found' });
    }
    res.json(checklist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findOne({ 
      where: { id: req.params.checklistId, UserId: req.user.id } 
    });
    if (!checklist) {
      return res.status(404).json({ msg: 'Checklist not found' });
    }
    await checklist.destroy();
    res.json({ msg: 'Checklist removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};