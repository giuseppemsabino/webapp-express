require("dotenv").config();

// # INIT EXPRESS
const { HOST_PORT, HOST_DOMAIN } = process.env;
const express = require("express");
const app = express();

//REGISTRING MIDDLEWARES
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound")


app.use(express.json())
app.use(express.static('public'));


//# ERROR HANDLER



// # ROUTERS 
const moviesRouter = require("./routers/moviesRouters");
app.use("/movies",moviesRouter);

//*START LISTENING
app.listen(HOST_PORT, () => {
  console.log(`Server listening at ${HOST_DOMAIN}:${HOST_PORT}`);
});
