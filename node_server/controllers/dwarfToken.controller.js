const { DwarfTokenModel } = require('../models/dwarfToken.model');

module.exports.getMetadataByTokenId = async (req, res) => {
  try {
    const tokenId = req.params.tokenId;

    const token = await DwarfTokenModel.findOne(
      { token_id: tokenId },
      {
        name: 1,
        token_id: 1,
        description: 1,
        image: 1,
        external_url: 1,
        attributes: 1
      }
    ).exec();

    if (token) {
      res.status(200).json({ ...token });
    } else {
      res.status(404).json({ message: 'Dwarf token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports.getDwarfByTokenId = async (req, res) => {
  try {
    const tokenId = req.params.tokenId;

    const token = await DwarfTokenModel.find({ token_id: tokenId }).exec();

    if (token.length > 0) {
      res.status(200).json(token[0]);
    } else {
      res.status(404).json({ message: 'Dwarf token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
