module.exports.setupRoutes = (app) => {
  const dwarfTokenRoutes = require('./dwarfToken.routes').router;

  app.use('/dwarf_token', dwarfTokenRoutes);
};
