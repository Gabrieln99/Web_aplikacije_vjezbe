import { body, param, query, validationResult } from "express-validator";

// Middleware za provjeru grešaka
export const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validacija za POST /movies
export const validateNewMovie = [
    body("title").notEmpty().withMessage("Title je obavezan"),
    body("year").isInt().withMessage("Year mora biti broj"),
    body("genre").notEmpty().withMessage("Genre je obavezan"),
    body("director").notEmpty().withMessage("Director je obavezan"),
];

// Validacija za PATCH /movies/:id
export const validateUpdateMovie = [
    param("id").isInt().withMessage("ID mora biti broj"),
    body("title").optional().trim(),
    body("year").optional().isInt(),
    body("genre").optional().trim(),
    body("director").optional().trim(),
];

// Validacija za GET /movies/:id
export const validateMovieId = [
    param("id").isInt().withMessage("ID mora biti broj"),
];

// Validacija za GET /movies s query parametrima
export const validateMoviesQuery = [
    query("min_year").optional().isInt().withMessage("min_year mora biti broj"),
    query("max_year").optional().isInt().withMessage("max_year mora biti broj"),
    query("min_year").custom((min, { req }) => {
        if (req.query.max_year && min >= req.query.max_year) {
            throw new Error("min_year mora biti manji od max_year");
        }
        return true;
    })
];

// Validacija za POST /actors
export const validateNewActor = [
    body("name").notEmpty().withMessage("Name je obavezan"),
    body("birthYear").isInt().withMessage("BirthYear mora biti broj"),
];

// Validacija za PATCH /actors/:id
export const validateUpdateActor = [
    param("id").isInt().withMessage("ID mora biti broj"),
    body("name").optional().trim(),
    body("birthYear").optional().isInt(),
];

// Validacija za GET /actors/:id
export const validateActorId = [
    param("id").isInt().withMessage("ID mora biti broj"),
];


export const validateActorsQuery = [
    query("name").optional().trim().isString().withMessage("Name mora biti string"),
];
