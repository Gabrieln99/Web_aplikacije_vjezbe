import express from "express";
import dohvati from "./dohvati.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/zaposlenici", dohvati);
app.get("/zaposlenici/:id", dohvati);

app.post("/dodaj", dohvati);

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
