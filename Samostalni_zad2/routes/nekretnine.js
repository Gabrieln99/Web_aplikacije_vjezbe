// nekretnine.js
import express from "express";
const router = express.Router();

const nekretnine = [
  {
    id: 1,
    naziv: "Jednosoban stan",
    opis: "Komforan stan u centru grada s prekrasnim pogledom.",
    cijena: 95000,
    lokacija: "Pula",
    broj_soba: 1,
    povrsina: 45,
  },

  {
    id: 2,
    naziv: "Jednosoban stan",
    opis: "Udoban stan u staroj gradskoj jezgri sa blizinom svih potrebnih sadržaja.",
    cijena: 85000,
    lokacija: "Osijek",
    broj_soba: 1,
    povrsina: 40,
  },
  // Dodaj ostale nekretnine po potrebi
];

// Ruta za dohvatanje svih nekretnina
router.get("/", (req, res) => {
  res.json(nekretnine);
});

// Ruta za dohvatanje nekretnine po ID-u
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nekretnina = nekretnine.find((n) => n.id === id);
  if (!nekretnina)
    return res.status(404).json({ poruka: "Nekretnina nije pronađena" });
  res.json(nekretnina);
});

// Ruta za dodavanje nove nekretnine
router.post("/", (req, res) => {
  const { id, naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  if (!id || !naziv || !cijena || !broj_soba || !povrsina) {
    return res.status(400).json({ poruka: "Molimo unesite sve podatke" });
  }
  if (cijena < 0 || broj_soba < 0 || povrsina < 0) {
    return res
      .status(400)
      .json({ poruka: "Vrijednosti ne mogu biti negativne" });
  }
  const novaNekretnina = {
    id,
    naziv,
    opis,
    cijena,
    lokacija,
    broj_soba,
    povrsina,
  };
  nekretnine.push(novaNekretnina);
  res.status(201).json(novaNekretnina);
});

// Ruta za ažuriranje postojeće nekretnine
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = nekretnine.findIndex((n) => n.id === id);
  if (index === -1)
    return res.status(404).json({ poruka: "Nekretnina nije pronađena" });

  const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  if (!naziv || cijena < 0 || broj_soba < 0 || povrsina < 0) {
    return res
      .status(400)
      .json({ poruka: "Podaci su nepotpuni ili neispravni" });
  }

  nekretnine[index] = {
    id,
    naziv,
    opis,
    cijena,
    lokacija,
    broj_soba,
    povrsina,
  };
  res.json(nekretnine[index]);
});

// Ruta za djelomičnu promjenu nekretnine
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nekretnina = nekretnine.find((n) => n.id === id);
  if (!nekretnina)
    return res.status(404).json({ poruka: "Nekretnina nije pronađena" });

  const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  if (cijena < 0 || broj_soba < 0 || povrsina < 0) {
    return res
      .status(400)
      .json({ poruka: "Cijena, broj soba i površina moraju biti pozitivni" });
  }

  Object.assign(nekretnina, {
    naziv,
    opis,
    cijena,
    lokacija,
    broj_soba,
    povrsina,
  });
  res.json(nekretnina);
});

// Ruta za brisanje nekretnine
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = nekretnine.findIndex((n) => n.id === id);
  if (index === -1)
    return res.status(404).json({ poruka: "Nekretnina nije pronađena" });

  nekretnine.splice(index, 1);
  res.status(204).end();
});

export default router;
