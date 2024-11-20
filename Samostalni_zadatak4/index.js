/*
import express from "express";
import { readFile } from "fs/promises";

const app = express();

const PORT = 3000;

app.get("/zaposlenici", async (req, res) => {
  try {
    const data = await readFile("./zaposlenici.json", "utf-8");
    res.status(200).send(data);
  } catch (error) {
    console.error("Greška prilikom čitanja datoteke", error);
    res.status(500).send("Greška prilikom čitanja datoteke.");
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});

*/

import express from "express";
import { readFile, writeFile } from "fs/promises";

const app = express();
const PORT = 3000;
const FILE_PATH = "./zaposlenici.json";

app.use(express.json()); // Omogućava parsiranje JSON tijela zahtjeva

// Helper funkcija za dohvat zaposlenika iz JSON datoteke
const getZaposlenici = async () => {
  const data = await readFile(FILE_PATH, "utf-8");
  return JSON.parse(data);
};

// Helper funkcija za spremanje zaposlenika u JSON datoteku
const saveZaposlenici = async (zaposlenici) => {
  await writeFile(FILE_PATH, JSON.stringify(zaposlenici, null, 2));
};

// GET /zaposlenici - Dohvat svih zaposlenika s podrškom za filtriranje i sortiranje
app.get("/zaposlenici", async (req, res) => {
  try {
    let zaposlenici = await getZaposlenici();
    const { sortiraj_po_godinama, pozicija, godine_staza_min, godine_staza_max } = req.query;

    // Filtriranje prema poziciji
    if (pozicija) {
      zaposlenici = zaposlenici.filter(z => z.pozicija.toLowerCase() === pozicija.toLowerCase());
    }

    // Filtriranje prema minimalnom i maksimalnom broju godina staža
    if (godine_staza_min) {
      zaposlenici = zaposlenici.filter(z => z.godine_staza >= Number(godine_staza_min));
    }
    if (godine_staza_max) {
      zaposlenici = zaposlenici.filter(z => z.godine_staza <= Number(godine_staza_max));
    }

    // Sortiranje prema godinama staža
    if (sortiraj_po_godinama) {
      zaposlenici.sort((a, b) =>
        sortiraj_po_godinama === "uzlazno"
          ? a.godine_staza - b.godine_staza
          : b.godine_staza - a.godine_staza
      );
    }

    res.status(200).json(zaposlenici);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja zaposlenika:", error);
    res.status(500).send("Greška prilikom dohvaćanja zaposlenika.");
  }
});

// GET /zaposlenici/:id - Dohvat zaposlenika po ID-u
app.get("/zaposlenici/:id", async (req, res) => {
  try {
    const zaposlenici = await getZaposlenici();
    const zaposlenik = zaposlenici.find(z => z.id === Number(req.params.id));

    if (!zaposlenik) {
      return res.status(404).send("Zaposlenik s traženim ID-om nije pronađen.");
    }

    res.status(200).json(zaposlenik);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja zaposlenika:", error);
    res.status(500).send("Greška prilikom dohvaćanja zaposlenika.");
  }
});

// POST /zaposlenici - Dodavanje novog zaposlenika
app.post("/zaposlenici", async (req, res) => {
  try {
    const { ime, prezime, godine_staza, pozicija } = req.body;

    // Validacija podataka
    if (!ime || !prezime || godine_staza == null || !pozicija) {
      return res.status(400).send("Sva polja (ime, prezime, godine_staza, pozicija) su obavezna.");
    }
    if (typeof ime !== "string" || typeof prezime !== "string") {
      return res.status(400).send("Ime i prezime moraju biti stringovi.");
    }
    if (isNaN(godine_staza) || godine_staza < 0) {
      return res.status(400).send("Godine staža moraju biti nenegativan broj.");
    }

    const zaposlenici = await getZaposlenici();

    const noviZaposlenik = {
      id: zaposlenici.length ? Math.max(...zaposlenici.map(z => z.id)) + 1 : 1,
      ime,
      prezime,
      godine_staza: Number(godine_staza),
      pozicija
    };

    zaposlenici.push(noviZaposlenik);
    await saveZaposlenici(zaposlenici);

    res.status(201).json(noviZaposlenik);
  } catch (error) {
    console.error("Greška prilikom dodavanja zaposlenika:", error);
    res.status(500).send("Greška prilikom dodavanja zaposlenika.");
  }
});

// Pokretanje servera
app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});

