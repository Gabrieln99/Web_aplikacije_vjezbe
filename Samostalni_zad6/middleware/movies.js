// Middleware za pretragu filma po ID-u
const movies = [
  { id: 4222334, title: "The Shawshank Redemption", year: 1994, genre: "Drama", director: "Frank Darabont" },
  { id: 5211223, title: "The Godfather", year: 1972, genre: "Crime", director: "Francis Ford Coppola" },
  { id: 4123123, title: "The Dark Knight", year: 2008, genre: "Action", director: "Christopher Nolan" }
];

const findMovieById = (req, res, next) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(m => m.id === movieId);
  if (movie) {
   console.log("Film pronađen:", movie);  
    req.movie = movie;
    return next();
  } else {
    console.log("Film nije pronađen");
    return res.status(404).json({ message: "Film nije pronađen" });
  }
};

export { findMovieById };

/*
// middleware/movies.js
const findMovieById = (req, res, next) => {
  const movieId = parseInt(req.params.id);
  console.log(`Traženje filma s ID-em: ${movieId}`);  // Ispis za testiranje

  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    console.log("Film pronađen:", movie);  // Ispis ako je film pronađen
    req.movie = movie;
    next();  // Prelazak na sljedeći middleware ili rutu
  } else {
    console.log("Film nije pronađen");
    return res.status(404).json({ message: "Film nije pronađen" });
  }
};
*/