import express from "express";

const router = express.Router();

const menu = [
  { pizza: "Capricciosa", cijena: 9 },
  { pizza: "Vegetariana", cijena: 9 },
  { pizza: "Margarita", cijena: 7 },
  { pizza: "Mjesana", cijena: 8 },
  { pizza: "Piccante", cijena: 10 },
];

router.get("/", (req, res) => {
  res.status(200).json(menu);
});

router.get("/:id", (req, res) => {
  const id_pizza = req.params.id;

  if (isNaN(id_pizza)) {
    return res.status(400).json({ message: "ID pizze mora biti broj." });
  }

  const pizza = menu.find((pizza) => pizza.pizza === id_pizza);
  if (pizza) {
    return res.status(200).json(pizza);
  } else {
    return res.status(404).json({ message: "Pizza nije pronađena." });
  }
});

export default router;
