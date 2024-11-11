import express from "express";

const menu = [
  { pizza: "Capricciosa", cijena: 9 },
  { pizza: "Vegetariana", cijena: 12 },
  { pizza: "Margarita", cijena: 7 },
  { pizza: "Mjesana", cijena: 8 },
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
        "Niste poslali sve potrebne podatke. treba upisatinarudzba, prezime, adresa i broj_telefona.",
    });
  }

  const invalidPizzas = narudzba.filter(
    (item) => !menu.some((pizza) => pizza.pizza === item.pizza)
  );
  if (invalidPizzas.length > 0) {
    return res.status(400).json({
      error: `pizza/pizze koje ste naručili nisu dostupne: ${invalidPizzas
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
  res.status(200).json({
    message: `Vaša narudžba za ${pizzaNames} je uspješno zaprimljena!`,
    prezime: klijent.prezime,
    adresa: klijent.adresa,
    ukupna_cijena: ukupnaCijena,
  });
});

router.get("/", (req, res) => {
  res.json(orders);
});

export default router;
