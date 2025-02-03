// index.js

import express from "express";
import korisniciRouter from "./routes/korisnici.js"; // Uvoz ruta
import { validationResult, query } from 'express-validator';
import { requestLogger, timer } from './middleware/logger.js'; // Middleware za logiranje

const app = express();
const PORT = 3000;

// Middleware za parsiranje JSON tijela zahtjeva
app.use(express.json());

// Middleware za logiranje zahtjeva i vrijeme
app.use(timer);
app.use(requestLogger);

// Dodavanje ruta
app.use("/korisnici", korisniciRouter);

// Ruta za testiranje (Hello API)
app.get('/hello', [
  query('ime').notEmpty().withMessage('Ime je obavezno'),
  query('ime').trim(),
  query('ime').isAlpha().withMessage('Ime mora sadržavati samo slova')
], (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.send('Hello, ' + req.query.ime);
  }
  return res.status(400).json({ errors: errors.array() });
});

// Pokretanje aplikacije
app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Poslužitelj radi na http://localhost:${PORT}`);
  }
});
