import express from "express";

import requestLogger from "./middleware/logger.js";
import moviesRouter from "./routes/movies.js";
import actorsRouter from "./routes/actors.js";

const app = express();

const port = 3000;

app.use(requestLogger);

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/actors", actorsRouter);

app.listen(port, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Poslužitelj radi na http://localhost:${port}`);
  }
});
