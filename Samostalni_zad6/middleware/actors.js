/*// Middleware za pretragu glumca po ID-u
const actors = [
  { id: 123, name: "Morgan Freeman", birthYear: 1937, movies: [4222334] },
  { id: 234, name: "Marlon Brando", birthYear: 1924, movies: [5211223] },
  { id: 345, name: "Al Pacino", birthYear: 1940, movies: [5211223] }
];

const findActorById = (req, res, next) => {
  const actorId = parseInt(req.params.id);
  const actor = actors.find(a => a.id === actorId);
  if (actor) {
    console.log("Glumac pronađen:", movie); 
    req.actor = actor;
    return next();
  } else {
    console.log("Glumac nije pronađen");
    return res.status(404).json({ message: "Glumac nije pronađen" });
  }
};

export { findActorById };*/



// Middleware za pretragu glumca po ID-u
const actors = [
  { id: 123, name: "Morgan Freeman", birthYear: 1937, movies: [4222334] },
  { id: 234, name: "Marlon Brando", birthYear: 1924, movies: [5211223] },
  { id: 345, name: "Al Pacino", birthYear: 1940, movies: [5211223] }
];

const findActorById = (req, res, next) => {
  const actorId = parseInt(req.params.id);
  const actor = actors.find(a => a.id === actorId);
  if (actor) {
    console.log("Glumac pronađen:", actor); 
    req.actor = actor;
    return next();
  } else {
    console.log("Glumac nije pronađen");
    return res.status(404).json({ message: "Glumac nije pronađen" });
  }
};

export { findActorById };

