const express = require("express");
const path = require("path");

const useri = [
  { ime: "Gabriel", prezime: "Nadal" },
  { ime: "Pero", prezime: "Peric" },
  { ime: "Ante", prezime: "Anic" },
];

let app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/* ili
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Koristimo path.join za spajanje putanje
});
*/
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/users", (req, res) => {
  res.json(useri);
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Slušam na portu:", PORT);
  }
});
