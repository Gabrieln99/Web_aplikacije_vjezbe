
import express from 'express';
import nekretnine_ruter from './routes/nekretnine.js';
import ponude_ruter from './routes/ponude.js';

const app = express();
const PORT = 3000;

// Middleware za parsiranje JSON-a
app.use(express.json());

// Postavljanje ruta
app.use('/nekretnine', nekretnine_ruter);
app.use('/ponude', ponude_ruter);

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});








