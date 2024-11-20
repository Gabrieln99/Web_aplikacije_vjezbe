import express from "express";
import nekretnine_ruter from "./routes/nekretnine.js";
import ponude_ruter from "./routes/ponude.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/nekretnine", nekretnine_ruter);
app.use("/ponude", ponude_ruter);

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});