const router = require('express').Router();
const dwarfTokenController = require('../controllers/dwarfToken.controller');

router.get('/:tokenId', dwarfTokenController.getDwarfByTokenId);
router.get(
  '/generate-image-from-gene/:gene',
  dwarfTokenController.generateImageFromGene
);

module.exports = { router };
