import { MongoClient } from "mongodb";

import { config } from "dotenv";

config(); // učitava osjetljive podatke iz .env datoteke

let mongoURI = process.env.MONGO_URI;
let db_name = process.env.MONGO_DB_NAME;

/*
let client; // Klijent za MongoDB
let db; // Referenca na bazu podataka

const client = new MongoClient(url: string, options?: MongoClientOptions);
const client = new MongoClient(mongoURI);

*/

async function connectToDatabase() {
  try {
    const client = new MongoClient(mongoURI); // stvaramo novi klijent
    await client.connect(); // spajamo se na klijent
    console.log("Uspješno spajanje na bazu podataka");
    let db = client.db(db_name); // odabiremo bazu podataka
    return db;
  } catch (error) {
    console.error("Greška prilikom spajanja na bazu podataka", error);
    throw error;
  }
}

export { connectToDatabase };