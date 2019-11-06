const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: true,
    minlength: 3,
    maxlength: 50
  },
  structure: Schema.Types.Mixed,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  created: { type: Date, default: Date.now }
});

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
