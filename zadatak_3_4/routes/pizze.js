import express from 'express';

const router = express.Router();

const menu = [
  { pizza: "Capricciosa", cijena: 50 },
  { pizza: "Vegetariana", cijena: 45 },
  { pizza: "Margarita", cijena: 40 },
  { pizza: "Mjesana", cijena: 55 },
];

router.get("/", (req, res) => {
  res.json(menu);
});

export default router;
