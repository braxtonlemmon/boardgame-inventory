const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name:        { type: String, required: true },
    description: { type: String, required: true },
    category:    [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    price:       { type: Number, required: true },
    qty:         { type: Number, required: true }        
  }
);

GameSchema
.virtual('url')
.get(function() {
  return `/game/${this._id}`;
});

module.exports = mongoose.model('Game', GameSchema);

