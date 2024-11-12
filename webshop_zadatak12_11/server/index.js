import express from "express";
import proizvodiRouter from "./routes/proizvodi.js"; // ispravi naziv
import narudzbeRouter from "./routes/narudzbe.js";

const app = express();
app.use(express.json());

// Registracija ruta
app.use("/proizvodi", proizvodiRouter);
app.use("/narudzbe", narudzbeRouter);

const PORT = 3000;
app.get("/", (req, res) => {
  res.status(200).json("okej");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
