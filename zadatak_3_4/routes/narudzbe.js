import express from "express";

const menu = [
  { pizza: "Capricciosa", cijena: 9 },
  { pizza: "Vegetariana", cijena: 12 },
  { pizza: "Margarita", cijena: 7 },
  { pizza: "Mjesana", cijena: 8 },
  { pizza: "Piccante", cijena: 10 },
];
let orders = [];

const router = express.Router();

router.post("/naruci", (req, res) => {
  const { narudzba, klijent } = req.body;

  if (
    !narudzba ||
    !klijent ||
    !klijent.prezime ||
    !klijent.adresa ||
    !klijent.broj_telefona
  ) {
    return res.status(400).json({
      error:
        "Niste poslali sve potrebne podatke. Očekuju se narudzba, prezime, adresa i broj_telefona.",
    });
  }

  const invalidPizzas = narudzba.filter(
    (item) => !menu.some((pizza) => pizza.pizza === item.pizza)
  );

  if (invalidPizzas.length > 0) {
    return res.status(400).json({
      error: `Jedna ili više pizza nisu dostupne: ${invalidPizzas
        .map((item) => item.pizza)
        .join(", ")}`,
    });
  }

  let ukupnaCijena = 0;
  narudzba.forEach((item) => {
    const pizza = menu.find((pizza) => pizza.pizza === item.pizza);
    ukupnaCijena += pizza.cijena * item.kolicina;
  });

  orders.push({ narudzba, klijent, ukupnaCijena });

  const pizzaNames = narudzba
    .map((item) => `${item.pizza} (${item.velicina})`)
    .join(" i ");

  res.status(201).json({
    message: `Narudžba za ${pizzaNames} je uspješno zaprimljena!`,
    prezime: klijent.prezime,
    adresa: klijent.adresa,
    ukupna_cijena: ukupnaCijena,
  });
});

router.get("/", (req, res) => {
  res.status(200).json(orders);
});

router.get("/:id", (req, res) => {
  const id_narudzbe = req.params.id;
  const order = orders.find((order) => order.id === id_narudzbe);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Narudžba nije pronađena." });
  }
});

router.delete("/:id", (req, res) => {
  const id_narudzbe = req.params.id;
  const index = orders.findIndex((order) => order.id === id_narudzbe);

  if (index !== -1) {
    orders.splice(index, 1);
    res.status(200).json({ message: "Narudžba uspješno obrisana." });
  } else {
    res.status(404).json({ message: "Narudžba nije pronađena." });
  }
});

export default router;
