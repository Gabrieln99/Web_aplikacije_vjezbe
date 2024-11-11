// ponude.js
import express from 'express';
const router = express.Router();
import nekretnine from './nekretnine.js';  // Uvoz podataka o nekretninama

let ponude = [];
let ponudaId = 1;

router.post('/', (req, res) => {
  const { nekretnina_id, ime, prezime, ponudjena_cijena, broj_telefona } = req.body;

  // Provjera svih potrebnih podataka
  if (!nekretnina_id || !ime || !prezime || !ponudjena_cijena || !broj_telefona) {
    return res.status(400).json({ poruka: "Molimo unesite sve podatke" });
  }

  // Provjera postoji li nekretnina s navedenim ID-em
  const nekretnina = nekretnine.find(n => n.id === nekretnina_id);
  if (!nekretnina) {
    return res.status(404).json({ poruka: "Nekretnina s navedenim ID-em ne postoji" });
  }

  // Kreiranje nove ponude
  const nova_ponuda = {
    id: ponudaId++,
    nekretnina_id,
    ime,
    prezime,
    ponudjena_cijena,
    broj_telefona,
  };

  ponude.push(nova_ponuda); // Dodavanje ponude u listu
  res.status(201).json(nova_ponuda); // Odgovaranje s novom ponudom
});

export default router;
