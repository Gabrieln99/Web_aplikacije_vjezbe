import express from "express"
import fs from "node:fs/promises"
const router = express.Router();
router.use

function getKorisnici(){
    let korisnici= fs.readFile("/././data.json", (err, content)=>{
        if (err) throw err;
    });
    return korisnici;
}

let data = (JOSN.parse(await getKorisnici()));

function newKorisnik(newUsers){
    fs.writeFiled("././data.json",JSON.stringify (newUsers))
}

router.get("/", (req,res)=>{
    res.status(200);
    res.json(data);
});

router.post("/", (req,res)=>{

    let id = req.body.id;
    let ime = req.body.ime;
    let prezime = req.body.prezime;

    if(id==null || ime==nul || prezime==null){
        let unique=true;
        for (korisnik of data){
            if(korisnik.id==id){
                unique=false;
        }
    }
    if(!unique){
        res.status(400);
        res.json("Id vec postoji");
    }
    else{

        res.status(400)
        res.json("Nedostaju parametri")
    }
       
    }
    else{
        data.push( id: id, ime: ime, prezime:prezime);
        newKorisnik(data); 
        res.status(200);
        res.json("oke");
    }
});

    export default router;
