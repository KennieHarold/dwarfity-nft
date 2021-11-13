const router = require('express').Router();
const dwarfTokenController = require('../controllers/dwarfToken.controller');

router.get('/:tokenId', dwarfTokenController.getMetadataByTokenId);

module.exports = { router };
