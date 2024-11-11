import express from "express";
import {nekretnine} from "./nekretnine.js";
const router = express.Router();

let ponude = [];
let ponuda_id = 1;

router.get("/", (req, res) => {
  res.json(ponude);
});


router.post("/", (req, res) => {
  const { nekretnina_id, ime, prezime, ponudjena_cijena, broj_telefona } =
    req.body;
  if (!nekretnina_id || !ime || !prezime || !ponudjena_cijena || !broj_telefona) {
    return res.status(400).json({ poruka: "Unesite id nekretnine, ime, prezime, ponudjenu cijenu i broj telefona" });
  }

  const nekretnina = nekretnine.find((n) => n.id === nekretnina_id);
  if (!nekretnina) {
    return res
      .status(404)
      .json({ poruka: "Nekretnina s tim IDem ne postoji" });
  }

  const nova_ponuda = {
    id: ponuda_id++,
    nekretnina_id,
    ime,
    prezime,
    ponudjena_cijena,
    broj_telefona,
  };
  ponude.push(nova_ponuda);
  res.status(201).json(nova_ponuda);
});

export default router;