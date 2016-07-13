var mongoose = require('mongoose');

var MailSchema = new mongoose.Schema({
  from: String,
  to: String,
  subject: String,
  sent_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mail', MailSchema);
