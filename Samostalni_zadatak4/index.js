import express from "express";
import { readFile } from "fs/promises";

const app = express();

const PORT = 3000;

app.get("/zaposlenici", async (req, res) => {
  try {
    const data = await readFile("./data.json", "utf-8");
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
