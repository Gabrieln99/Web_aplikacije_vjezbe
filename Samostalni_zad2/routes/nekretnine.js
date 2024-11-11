import express from "express";
const router = express.Router();

let nekretnine = [
  {
    id: 1,
    naziv: "Nadal",
    opis: "Najbolja nekretnina, sa pogledom direkt na more",
    cijena: 150000,
    lokacija: "Umag",
    broj_soba: 3,
    povrsina: 90,
  },
  {
    id: 1,
    naziv: "Buzarija",
    opis: "za renovaciju spremna",
    cijena: 200000,
    lokacija: "Stanzietta",
    broj_soba: 4,
    povrsina: 120,
  },
];

router.get("/", (req, res) => {
  res.json(nekretnine);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nekretnina = nekretnine.find((n) => n.id === id);
  if (!nekretnina)
    return res.status(404).json({ poruka: "Nekretnina s tim IDem ne postoji" });
  res.json(nekretnina);
});

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
  const nova_nekretnina = {
    id,
    naziv,
    opis,
    cijena,
    lokacija,
    broj_soba,
    povrsina,
  };
  nekretnine.push(nova_nekretnina);
  res.status(201).json(nova_nekretnina);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = nekretnine.findIndex((n) => n.id === id);
  if (index <= -1)
    return res.status(404).json({ poruka: "Nekretnina nije pronađena" });

  const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  if (!naziv || cijena < 0 || broj_soba < 0 || povrsina < 0) {
    return res.status(400).json({
      poruka: "Unesite naziv, opis, cijena, lokacija, broj soba i povrsinu",
    });
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

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = nekretnine.findIndex((n) => n.id === id);
  const nekretnina = nekretnine.find((n) => n.id === id);
  if (!nekretnina)
    return res.status(404).json({ poruka: "Nema te nekretnine" });

  const cijena = 222222;

  nekretnine[index].cijena = cijena;
  res.json(nekretnina);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = nekretnine.findIndex((n) => n.id === id);
  if (index === -1)
    return res.status(404).json({ poruka: "Nema te nekretnine" });

  nekretnine.splice(index, 1);
  res.status(204).end();
});

export { router as default, nekretnine };
