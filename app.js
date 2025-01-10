require("dotenv").config();

// # INIT EXPRESS
const { HOST_PORT, HOST_DOMAIN } = process.env;
const express = require("express");
const app = express();

//# middlewares
app.use(express.json())
app.use(express.static('public'));


//# ERROR HANDLER
const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHadler")

app.use(errorsHandler);
app.use(notFound);


// # ROUTERS 
const moviesRouter = require("./routers/moviesRouters")
app.use("/movies", moviesRouter);

//*START LISTENING
app.listen(HOST_PORT, () => {
  console.log(`Server listening at ${HOST_DOMAIN}:${HOST_PORT}`);
});
