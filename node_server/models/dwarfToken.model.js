const mongoose = require('mongoose');

const dwarfTokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  token_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  external_url: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  price: {
    currency: {
      type: String,
      default: 'ETH'
    },
    value: {
      type: Number,
      min: [0, "Value can't be less than 0"]
    }
  },
  attributes: [
    {
      trait_type: {
        type: String,
        enum: [
          'Eye',
          'Body',
          'Gloves',
          'Gloves Lining',
          'Mustache',
          'Shoe',
          'Shoe Lining',
          'Shoulder Plate',
          'Shoulder Plate Lining'
        ]
      },
      value: String
    }
  ]
});

const DwarfTokenModel = mongoose.model('dwarf_nfts', dwarfTokenSchema);

module.exports = { DwarfTokenModel };
