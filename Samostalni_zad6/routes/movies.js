import express from "express";
import { check, validationResult, query, param } from "express-validator";

import { findMovieById } from "../middleware/movies.js";
// import { findMovieById } from "../middleware/movieMiddleware.js";

const router = express.Router();

let movies = [
  {
    id: 4222334,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    director: "Frank Darabont",
  },
  {
    id: 5211223,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    director: "Francis Ford Coppola",
  },
  {
    id: 4123123,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    director: "Christopher Nolan",
  },
];

router.get("/", [
  query("min_year").optional().isInt().withMessage("min_year mora biti broj"),
  query("max_year").optional().isInt().withMessage("max_year mora biti broj"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const min_year = req.query.min_year ? parseInt(req.query.min_year) : null;
    const max_year = req.query.max_year ? parseInt(req.query.max_year) : null;

    if (min_year && max_year && min_year >= max_year) {
      return res
        .status(400)
        .json({ error: "min_year mora biti manji od max_year" });
    }

    let filteredMovies = [...movies];
    if (min_year) {
      filteredMovies = filteredMovies.filter((movie) => movie.year >= min_year);
    }
    if (max_year) {
      filteredMovies = filteredMovies.filter((movie) => movie.year <= max_year);
    }

    res.status(200).json(filteredMovies);
  },
]);

router.get(
  "/:id",
  [
    param("id").isInt().withMessage("ID mora biti broj"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    findMovieById,
  ],
  (req, res) => {
    res.status(200).json(req.movie);
  }
);

router.post(
  "/",
  [
    check("title").notEmpty().withMessage("Naslov je obavezan"),
    check("year").isInt({ min: 1900 }).withMessage("Godina mora biti valjana"),
    check("genre").notEmpty().withMessage("Žanr je obavezan"),
    check("director").notEmpty().withMessage("Redatelj je obavezan"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMovie = { id: Date.now(), ...req.body };
    movies.push(newMovie);
    res.status(201).json(newMovie);
  }
);

router.patch(
  "/:id",
  [
    check("title")
      .optional()
      .notEmpty()
      .withMessage("Naslov ne može biti prazan"),
    check("year")
      .optional()
      .isInt({ min: 1900 })
      .withMessage("Godina mora biti valjana"),
    check("genre")
      .optional()
      .notEmpty()
      .withMessage("Žanr ne može biti prazan"),
    check("director")
      .optional()
      .notEmpty()
      .withMessage("Redatelj ne može biti prazan"),
  ],
  findMovieById,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, year, genre, director } = req.body;

    req.movie.title = title || req.movie.title;
    req.movie.year = year || req.movie.year;
    req.movie.genre = genre || req.movie.genre;
    req.movie.director = director || req.movie.director;

    const movieIndex = movies.findIndex((m) => m.id === req.movie.id);
    if (movieIndex !== -1) {
      movies[movieIndex] = req.movie;
    }

    console.log("Ažurirani filmovi:", movies);

    res.status(200).json(req.movie);
  }
);

export default router;
