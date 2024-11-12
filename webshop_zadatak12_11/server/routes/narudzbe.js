import express from "express";
import { Proizvod, proizvodi } from "../data.js";
const router = express.Router();

class Narudzba {
  constructor(id, naruceni_proizvodi) {
    this.id = id;
    this.naruceni_proizvodi = naruceni_proizvodi;
  }
  get ukupnaCijena() {
    let ukupno = thi.naruceni_proizvodi.reduce((suma, trenutni_proizvod) => {
      let prozivod_obj = proizvodi.find((p) => p.id == trenutni_proizvod.id);
      return prozivod_obj.cijena * trenutni_proizvod.narucena_kolicina;
    }, 0);
  }
}
let narudzbe = [];
const dummy_narudzba = new Narudzba(1, [
  { id: 1, velicina: "M", narucena_kolicina: 2 },
  { id: 2, velicina: "onesize", narucena_kolicina: 1 },
]);

narudzbe.push(dummy_narudzba);

router.post("/", (req, res) => {
  let podaci = req.body;
  let naruceni_proizvodi = podaci.naruceni_proizvodi;
  let id_nove_narudzbe = narudzbe.length ? narudzbe.at(-1).id + 1 : 1;
  const narudzba_obj = new Narudzba(id_nove_narudzbe, naruceni_proizvodi);
  narudzbe.push(podaci);
  return res.status(201).json("radiradi");
});

console.log(narudzbe)

export default router;