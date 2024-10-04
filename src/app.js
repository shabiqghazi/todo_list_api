require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/checklist/:checklistId/item', require('./routes/items'));
app.use('/api/checklist', require('./routes/checklists'));

const PORT =  5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});