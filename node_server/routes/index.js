module.exports.setupRoutes = (app) => {
  const metadataRoutes = require('./metadata.routes').router;
  const dwarfTokenRoutes = require('./dwarfToken.routes').router;

  app.use('/dwarfity', metadataRoutes); //  For metadata only
  app.use('/dwarf-token', dwarfTokenRoutes);
};
