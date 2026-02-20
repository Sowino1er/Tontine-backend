const mongoose = require('mongoose');

const MembreSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  groupeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Groupe' }
});

module.exports = mongoose.model('Membre', MembreSchema);
