const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema(
  {
    game: { 
      type: Schema.Types.ObjectId, 
      ref: 'Game', 
      required: true 
    },
    language: String,
    condition: { 
      type: String, 
      required: true, 
      enum: ['New', 'Excellent', 'Good', 'Fair', 'Poor'],
      default: 'New'
    }
  }
);

GameInstanceSchema
.virtual('url')
.get(function () {
  return `/gameinstance/${this._id}`;
});

module.exports = mongoose.model('GameInstance', GameInstanceSchema);