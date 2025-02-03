import express from "express";

import { findActorById } from "../middleware/actors.js";
//import { findActorById } from "../middleware/actorMiddleware.js";

const router = express.Router();

let actors = [
  { id: 123, name: "Morgan Freeman", birthYear: 1937, movies: [4222334] },
  { id: 234, name: "Marlon Brando", birthYear: 1924, movies: [5211223] },
  { id: 345, name: "Al Pacino", birthYear: 1940, movies: [5211223] },
];

const validateIntegerId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID mora biti broj!" });
  }
  req.params.id = id;
  next();
};

const validateNameParam = (req, res, next) => {
  const { name } = req.query;
  if (name && typeof name !== "string") {
    return res
      .status(400)
      .json({ message: "Name(ime) parametar mora biti string!" });
  }
  if (name) {
    req.query.name = name.trim();
  }
  next();
};

router.get("/", validateNameParam, (req, res) => {
  const { name } = req.query;
  if (name) {
    const filteredActors = actors.filter((actor) =>
      actor.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.status(200).json(filteredActors);
  }
  res.status(200).json(actors);
});

router.get("/:id", validateIntegerId, findActorById, (req, res) => {
  res.status(200).json(req.actor);
});

router.post("/", (req, res) => {
  const { name, birthYear } = req.body;
  if (!name || !birthYear) {
    return res
      .status(400)
      .json({ message: "Ime i godinarodenja su obavezni!" });
  }
  const newActor = { id: Date.now(), ...req.body };
  actors.push(newActor);
  res.status(201).json(newActor);
});

router.patch("/:id", findActorById, (req, res) => {
  const { name, birthYear } = req.body;
  if (!name && !birthYear) {
    return res
      .status(400)
      .json({ message: "morate upisati ime i god rodenja" });
  }
  Object.assign(req.actor, req.body);
  res.json({ message: "Glumac ažuriran!", actor: req.actor });
});

export default router;
