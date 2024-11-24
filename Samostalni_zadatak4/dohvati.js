import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.get("/zaposlenici", async (req, res) => {
    const parametri = req.query;
    try {
      const podData = await fs.readFile("zaposlenici.json", "utf8");
      let zaposlenici = JSON.parse(podData);
  
      Object.keys(parametri).forEach((ab) => {

        switch (ab) {

            case "sortiraj_godine_staza":
    if (parametri.sortiraj_godine_staza === "uzlazno") {
        zaposlenici.sort((a, b) => a.godine_staza - b.godine_staza); 

    } else if (parametri.sortiraj_godine_staza === "silazno") {
        zaposlenici.sort((a, b) => b.godine_staza - a.godine_staza); 
    } 
    break;
          case "pozicija":
            zaposlenici = zaposlenici.filter(
              (zaposlenik) =>
                zaposlenik.pozicija.toLowerCase() === parametri.pozicija.toLowerCase()
            );
            break;
  
            case "godine_staza_min":
            zaposlenici = zaposlenici.filter(
              (zaposlenik) => zaposlenik.godine_staza >= Number(parametri.godine_staza_min)
            );
            break;
  
          case "godine_staza_max":
            zaposlenici = zaposlenici.filter(
              (zaposlenik) => zaposlenik.godine_staza <= Number(parametri.godine_staza_max)
            );
            break;
      
              default:
                break;
            }
          });
  
      res.status(200).send(zaposlenici);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja zaposlenika:", error);
      res.status(500).send("Greška prilikom dohvaćanja podataka.");
    }
  });
  

router.get("/zaposlenici/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const zaposlenici = await fs.readFile("zaposlenici.json", "utf8");
    const zaposlenik = JSON.parse(zaposlenici).find((z) => z.id == id);

    if (zaposlenik) {
      res.status(200).send(zaposlenik);

    } else 
    res.status(400).send("Error! Ne postoji taj ID");

  } catch (error) {
    console.log("Ne stima nesto");
    res.status(500).send("Nisu dobro dohvačeni podatci");
  }
});

router.post("/dodaj", async (req, res) => {
    const novi_zaposlenik = req.body;
    try {
      const zaposlenici = await fs.readFile("zaposlenici.json", "utf8");
      const nz = JSON.parse(zaposlenici);
      let id = nz.length;
      while (nz.find((z) => z.id == id)) {
        id++;
      }
      novi_zaposlenik.id = id;
      nz.push(novi_zaposlenik);
      await fs.writeFile("zaposlenici.json", JSON.stringify(nz), "utf8");
      res.status(201).send(nz);
    } catch (error) {
      console.log("ERROR");
      res.status(500).send(error);
    }
  });

export default router;