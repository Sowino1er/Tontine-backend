const mongoose = require('mongoose');

const GroupeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Membre' }],
  rotation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Membre' }]
});

module.exports = mongoose.model('Groupe', GroupeSchema);
