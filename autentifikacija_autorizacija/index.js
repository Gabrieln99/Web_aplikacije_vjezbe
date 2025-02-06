import express from "express";
import cors from "cors";
import crypto from "crypto";

import {
  authMiddleware,
  hashPassword,
  checkPassword,
  generateJWT,
  verifyJWT,
} from "./auth.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;
const users = []; // Moved users array to the top before using it

console.log("Secret KLJUC: ");
console.log(crypto.randomBytes(32).toString("hex")); // generira 256-bitni ključ (32 x 8 =256)

let objave = [
  {
    id: 1,
    naslov: "Prva objava",
    sadrzaj: "Ovo je prva objava",
    autor: "lukablaskovic",
  },
  {
    id: 2,
    naslov: "Druga objava",
    sadrzaj: "Ovo je druga objava",
    autor: "markoMaric",
  },
  {
    id: 3,
    naslov: "Treća objava",
    sadrzaj: "Ovo je treća objava",
    autor: "peroPeric",
  },
  {
    id: 4,
    naslov: "Četvrta objava",
    sadrzaj: "Ovo je četvrta objava",
    autor: "lukablaskovic",
  },
];

app.get("/objave", [authMiddleware], async (req, res) => {
  let userObjave = objave.filter(
    (objava) => objava.autor === req.authorised_user.username
  ); //dohvaćamo podatke iz dekodiranog payloada (req.authorised_user)
  res.json(userObjave);
});

/*
    app.get('/objave', async (req, res) => {
        let token = req.headers.authorization.split(' ')[1]; // dohvaćanje JWT tokena iz zaglavlja
        let decoded = await verifyJWT(token); // provjera valjanosti JWT tokena
        if (!decoded) {
        return res.status(401).send('Nevaljan JWT token!');
        }
        // filtriramo objave prema autoru ako je JWT token valjan, odnosno ako je korisnik autoriziran
        let userObjave = objave.filter(objava => objava.autor === decoded.username); // dohvaćamo
        // podatke iz dekodiranog payloada (decoded)
        res.json(userObjave);
        });
*/
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let hashedPassword = await hashPassword(password, 10); // hashiranje lozinke
  // dodajemo korisnika u listu korisnika
  users.push({ username, password: hashedPassword });
  console.log("Registered users:", users); // Added console.log here to see users after registration
  res.status(200).send("Korisnik je uspješno registriran!");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).send("Greška prilikom prijave!");
  }
  let result = await checkPassword(password, user.password); // usporedba lozinke i hash vrijednosti
  if (!result) {
    return res.status(400).send("Greška prilikom prijave!");
  }
  // ako je prijava uspješna, generiramo JWT token
  let token = await generateJWT({ id: user.id, username: user.username }); // generiranje JWT tokena
  // šaljemo JWT token korisniku
  res.status(200).json({ jwt_token: token });
});

app.get("/", (req, res) => {
  res.send("Spremni za autentifikaciju!");
});

app.listen(port, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Poslužitelj radi na http://localhost:${port}`);
  }
});
