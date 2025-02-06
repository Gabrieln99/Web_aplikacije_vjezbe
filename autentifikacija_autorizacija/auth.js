import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// middleware funkcija za autentifikaciju korisnika:
const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]; // dohvaćanje JWT tokena iz zaglavlja
  let decoded = await verifyJWT(token); // provjera valjanosti JWT tokena
  if (!decoded) {
    return res.status(401).send("Nevaljan JWT token!");
  }
  req.authorised_user = decoded; // spremamo dekodirani payload u req objekt
  next(); // nastavljamo dalje
};

// Funkcija za hashiranje lozinke koja koristi bcrypt paket:

async function hashPassword(plainPassword, saltRounds) {
  try {
    let hash = await bcrypt.hash(plainPassword, saltRounds); // hashiranje lozinke
    return hash;
  } catch (err) {
    console.error(`Došlo je do greške prilikom hashiranja lozinke: ${err}`);
    return null;
  }
}

//Funkcija za provjeru podudaranja lozinke i hash vrijednosti:

async function checkPassword(plainPassword, hashedPassword) {
  try {
    let result = await bcrypt.compare(plainPassword, hashedPassword); // usporedba lozinke i hash vrijednosti
    return result;
  } catch (err) {
    console.error(
      `Došlo je do greške prilikom usporedbe hash vrijednosti: ${err}`
    );
    return false;
  }
}

// kod za generiranje JWT tokena u funkciju generateJWT :

async function generateJWT(payload) {
  try {
    let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token vrijedi 1 sat
    return token;
  } catch (err) {
    console.error(`Došlo je do greške prilikom generiranja JWT tokena: ${err}`);
    return null;
  }
}

// funkcija za provjeru valjanosti JWT tokena:

async function verifyJWT(token) {
  try {
    let decoded = jwt.verify(token, JWT_SECRET); // provjera valjanosti JWT tokena
    return decoded;
  } catch (err) {
    console.error(
      `Došlo je do greške prilikom verifikacije JWT tokena: ${err}`
    );
    return null;
  }
}

export { authMiddleware, hashPassword, checkPassword, generateJWT, verifyJWT };
