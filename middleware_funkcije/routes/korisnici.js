// routes/korisnici.js

import express from "express";
import { body, validationResult } from 'express-validator';

// Uvoz middleware funkcija
import { validacijaEmaila, pretragaKorisnika } from "../middleware/korisnici.js";

const router = express.Router();

let korisnici = [
  { id: 983498354, ime: "Ana", prezime: "Anić", email: "aanic@gmail.com" },
  { id: 983498355, ime: "Ivan", prezime: "Ivić", email: "iivic@gmail.com" },
  { id: 983498356, ime: "Sanja", prezime: "Sanjić", email: "ssanjic123@gmail.com" },
];

// Ruta za dohvat svih korisnika
router.get("/", async (req, res) => {
  if (korisnici) {
    return res.status(200).json(korisnici);
  }
  return res.status(404).json({ message: "Nema korisnika" });
});

// Ruta za dohvat korisnika prema ID-u
router.get("/:id", [pretragaKorisnika], async (req, res) => {
  return res.status(200).json(req.korisnik);
});

// PATCH ruta za ažuriranje korisničkog emaila
router.patch(
  "/:id",
  [
    pretragaKorisnika, // Provjerava postojanje korisnika
    body('email')
      .isEmail()
      .withMessage('Email adresa nije ispravna (primjer123@unipu.hr)')
      .contains('@unipu.hr')
      .withMessage('Email adresa mora biti s @unipu.hr')
  ],
  async (req, res) => {
    const errors = validationResult(req); // Provjera valjanosti podataka

    // Ako nema grešaka
    if (errors.isEmpty()) {
      req.korisnik.email = req.body.email; // Ažuriraj korisnički email
      console.log(korisnici); // Ispis korisnika
      return res.status(200).json(req.korisnik);
    }

    // Ako postoji greška
    return res.status(400).json({ errors: errors.array() });
  }
);

export default router;
