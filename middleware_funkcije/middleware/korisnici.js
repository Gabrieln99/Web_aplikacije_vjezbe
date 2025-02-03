// middleware/korisnici.js

let korisnici = [
  { id: 983498354, ime: "Ana", prezime: "Anić", email: "aanic@gmail.com" },
  { id: 983498355, ime: "Ivan", prezime: "Ivić", email: "iivic@gmail.com" },
  { id: 983498356, ime: "Sanja", prezime: "Sanjić", email: "ssanjic123@gmail.com" },
];

// Middleware za validaciju emaila
const validacijaEmaila = (req, res, next) => {
  console.log('Middleware: validacijaEmaila');

  // Provjera je li email prisutan i je li tipa string
  if (req.body.email && typeof req.body.email === 'string') {
    // Provjera ispravnosti email adrese
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: 'Email adresa nije ispravna' });
    }
    return next(); // Ako je email ispravan, nastavi dalje
  }

  return res.status(400).json({ message: 'Neispravna struktura tijela zahtjeva' });
};

// Middleware za pretragu korisnika prema ID-u
const pretragaKorisnika = (req, res, next) => {
  console.log('Middleware: pretragaKorisnika');
  const id_route_param = parseInt(req.params.id);
  const korisnik = korisnici.find(korisnik => korisnik.id === id_route_param);
  if (korisnik) {
    req.korisnik = korisnik;
    return next(); // Ako korisnik postoji, nastavi dalje
  }
  return res.status(404).json({ message: 'Korisnik nije pronađen' });
};

// Izvoz middleware funkcija
export { validacijaEmaila, pretragaKorisnika };
