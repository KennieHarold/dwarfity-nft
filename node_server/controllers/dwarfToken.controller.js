const { DwarfTokenModel } = require('../models/dwarfToken.model');
const assetsIndex = require('../utils/assetsIndex');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const { uploadTokenImage } = require('../services/cloudinary.service');

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

module.exports.addDwarf = async (req, res) => {
  console.log(req.body);

  try {
    await DwarfTokenModel({ ...req.body }).save();

    res.status(201).send('Success!');
  } catch (error) {
    console.log(error);
    res.status(500).send('There is an error');
  }
};

module.exports.generateImageFromGene = async (req, res) => {
  try {
    const reqGene = req.params.gene;
    let gene = [];

    for (let i = 0; i < reqGene.length; i++) {
      gene.push(reqGene[i]);
    }

    console.log(gene);

    if (gene.length !== 9) {
      throw { message: 'invalid-gene' };
    }

    const width = 1000;
    const height = 1000;

    //  Create image using canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);

    loadImage(path.join(__dirname + '/../assets/base.png')).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname + '/../assets/body/' + assetsIndex.body[gene[0]] + '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname + '/../assets/eye/' + assetsIndex.eye[gene[1]] + '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname +
          '/../assets/mustache/' +
          assetsIndex.mustache[gene[2]] +
          '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname + '/../assets/shoe/' + assetsIndex.shoe[gene[3]] + '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname +
          '/../assets/shoe_lining/' +
          assetsIndex.shoe_lining[gene[4]] +
          '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname + '/../assets/gloves/' + assetsIndex.gloves[gene[5]] + '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname +
          '/../assets/gloves_lining/' +
          assetsIndex.gloves_lining[gene[6]] +
          '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname +
          '/../assets/shoulder_plate/' +
          assetsIndex.shoulder_plate[gene[7]] +
          '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);
    });

    loadImage(
      path.join(
        __dirname +
          '/../assets/shoulder_plate_lining/' +
          assetsIndex.shoulder_plate_lining[gene[8]] +
          '.png'
      )
    ).then((image) => {
      context.drawImage(image, 0, 0, width, height);

      const buffer = canvas.toBuffer('image/png');

      if (!fs.existsSync(path.join(__dirname + '/../uploads'))) {
        fs.mkdirSync(path.join(__dirname + '/../uploads'));
      }

      fs.writeFileSync(
        path.join(__dirname + '/../uploads/breed_result.png'),
        buffer
      );
    });

    const { response, error } = await uploadTokenImage(
      path.join(__dirname + '/../uploads/breed_result.png')
    );

    if (error) {
      throw { message: 'upload-failed' };
    }

    res.status(200).json({ secure_url: response.secure_url });
  } catch (error) {
    console.log(error);

    if (error.message === 'invalid-gene') {
      res.status(404).json({ error: 'Invalid Gene' });
    } else if (error.message === 'upload-failed') {
      res.status(500).json({ error: 'Upload failed to cloudinary' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};
