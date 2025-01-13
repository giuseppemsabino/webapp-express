require("dotenv").config();

// *INIT EXPRESS
const { HOST_PORT, HOST_DOMAIN } = process.env;
const express = require("express");
const cors = require('cors')
const app = express();

// ! middlewares
app.use(cors())
app.use(express.json());
app.use(express.static("public"));

// ! ROUTERS
const moviesRouter = require("./routers/moviesRouters");
app.use("/api/movies", moviesRouter);

//! ERROR HANDLER
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHadler");

// *I middleware per la gestione degli errori devono essere aggiunti DOPO i router
app.use(notFound);
app.use(errorsHandler);

// *START LISTENING
app.listen(HOST_PORT, () => {
  console.log(`Server listening at ${HOST_DOMAIN}:${HOST_PORT}`);
});
