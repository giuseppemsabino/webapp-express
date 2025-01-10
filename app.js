require("dotenv").config();

// # INIT EXPRESS
const express = require("express");
const app = express();
const { HOST_PORT, HOST_DOMAIN } = process.env;

//*START LISTENING
app.listen(HOST_PORT, () => {
  console.log(`Server listening at ${HOST_DOMAIN}:${HOST_PORT}`);
});
