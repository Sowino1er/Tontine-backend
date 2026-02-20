const express = require('express');
const router = express.Router();
const Groupe = require('../models/Groupe');
const Membre = require('../models/Membre');

// GET tous les groupes
router.get('/', async (req, res) => {
  const groupes = await Groupe.find().populate('membres');
  res.json(groupes);
});

// POST créer un groupe
router.post('/', async (req, res) => {
  const { nom } = req.body;
  const groupe = new Groupe({ nom, membres: [], rotation: [] });
  await groupe.save();
  res.json(groupe);
});

// POST ajouter un membre
router.post('/:id/membre', async (req, res) => {
  const { nom } = req.body;
  const groupe = await Groupe.findById(req.params.id);
  if (!groupe) return res.status(404).json({ message: 'Groupe introuvable' });

  const membre = new Membre({ nom, groupeId: groupe._id });
  await membre.save();

  groupe.membres.push(membre._id);
  groupe.rotation.push(membre._id);
  await groupe.save();

  res.json(membre);
});

// DELETE membre
router.delete('/:id/membre/:membreId', async (req, res) => {
  const { id, membreId } = req.params;
  const groupe = await Groupe.findById(id);
  if (!groupe) return res.status(404).json({ message: 'Groupe introuvable' });

  await Membre.findByIdAndDelete(membreId);

  groupe.membres = groupe.membres.filter(m => m.toString() !== membreId);
  groupe.rotation = groupe.rotation.filter(m => m.toString() !== membreId);
  await groupe.save();

  res.json({ message: 'Membre supprimé' });
});

module.exports = router;
