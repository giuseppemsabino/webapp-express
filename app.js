require("dotenv").config();

// *INIT EXPRESS
const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors')
const { HOST_PORT, HOST_DOMAIN, APP_FRONTEND_URL } = process.env;

// !CORSE CONFIG
var corsOptions = {
  origin: APP_FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// ! middlewares
app.use(cors(corsOptions))
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));


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
