import express from "express";
import { connectToDatabase } from "./db.js";
import { ObjectId } from "mongodb";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

const db = await connectToDatabase();
let users_collection = db.collection("users");
let allUsers = await users_collection.find().toArray();

app.get("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let cijena_query = req.query.cijena;
  if (!cijena_query) {
    let pizze = await pizze_collection.find().toArray(); // dohvaćamo sve pizze
    return res.status(200).json(pizze);
  }
  try {
    let pizze = await pizze_collection
      .find({ cijena: Number(cijena_query) })
      .toArray();
    // provjerava se točno podudaranje cijene
    res.status(200).json(pizze);
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.get("/pizze/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let naziv_param = req.params.naziv;
  let pizza = await pizze_collection.find({ naziv: naziv_param }).toArray();
  // ili
  //let pizza = await pizze_collection.findOne({ naziv: naziv_param }); // samo 1 rezultat,
  //ne koristimo metodu Iterator.toArray()
  res.status(200).json(pizza);
});

app.post("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let novaPizza = req.body;
  try {
    let result = await pizze_collection.insertOne(novaPizza);
    res.status(201).json({ insertedId: result.insertedId }); // Kad šaljemo JSON, moramo podatak spremiti u neki ključ
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse }); // 400 jer je korisnik poslao neispravne podatke
  }
});
app.post("/narudzbe", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let narudzbe_collection = db.collection("narudzbe");
  let novaNarudzba = req.body;
  let obavezniKljucevi = ["kupac", "adresa", "broj_telefona", "narucene_pizze"];
  let obavezniKljuceviStavke = ["naziv", "količina", "veličina"];
  if (!obavezniKljucevi.every((kljuc) => kljuc in novaNarudzba)) {
    return res.status(400).json({ error: "Nedostaju obavezni ključevi" });
  }

  if (
    !novaNarudzba.narucene_pizze.every((stavka) =>
      obavezniKljuceviStavke.every((kljuc) => kljuc in stavka)
    )
  ) {
    return res
      .status(400)
      .json({ error: "Nedostaju obavezni ključevi u stavci narudžbe" });
  }
  // dodajemo dodatne provjere za svaku stavku narudžbe
  // negacija uvjeta: budući da 'every' vraća true ako je za svaki element polja uvjet ispunjen

  let dostupne_pizze = await pizze_collection.find().toArray();
  if (
    !novaNarudzba.narucene_pizze.every((stavka) =>
      dostupne_pizze.some((pizza) => pizza.naziv === stavka.naziv)
    )
  ) {
    return res
      .status(400)
      .json({ error: "Odabrali ste pizzu koju nemamo u ponudi" });
  }

  if (
    !novaNarudzba.narucene_pizze.every((stavka) => {
      // provjeravamo 3 uvjeta: količina je integer i veća od 0, veličina je jedna od triju veličina
      return (
        Number.isInteger(stavka.količina) &&
        stavka.količina > 0 &&
        ["mala", "srednja", "velika"].includes(stavka.veličina)
      );
    })
  ) {
    return res
      .status(400)
      .json({ error: "Neispravni podaci u stavci narudžbe" });
  }
  try {
    let result = await narudzbe_collection.insertOne(novaNarudzba);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.patch("/pizze/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let naziv_param = req.params.naziv;
  let novaCijena = req.body.cijena;

  try {
    let result = await pizze_collection.updateOne(
      { naziv: naziv_param },
      {
        $set: {
          cijena: novaCijena,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Pizza nije pronađena" });
    }
    res.status(200).json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.patch("/narudzbe/:id", async (req, res) => {
  let narudzbe_collection = db.collection("narudzbe");
  let id_param = req.params.id;
  let noviStatus = req.body.status; // npr. 'isporučeno', 'u pripremi', 'otkazano'

  try {
    let result = await narudzbe_collection.updateOne(
      { _id: new ObjectId(id_param) },
      {
        $set: { status: noviStatus },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Narudžba nije pronađena" });
    }

    res.status(200).json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.put("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let noviMeni = req.body;
  try {
    await pizze_collection.drop(); // brišemo cijelu kolekciju
    let result = await pizze_collection.insertMany(noviMeni);
    res.status(200).json({ insertedCount: result.insertedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.delete("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  try {
    let result = await pizze_collection.deleteMany({}); // brišemo sve pizze iz kolekcije
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.get("/users", async (req, res) => {
  let users_collection = db.collection("users"); // pohranjujemo referencu na kolekciju
  let allUsers = await users_collection.find().toArray(); // dohvaćamo sve korisnike iz kolekcije i pretvaramo Cursor objekt u Array
  console.log(allUsers);
  res.status(200).json(allUsers);
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greska prilikom pokretanja posluzitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
