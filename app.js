require("dotenv").config();

// # INIT EXPRESS
const { HOST_PORT, HOST_DOMAIN } = process.env;
const express = require("express");
const app = express();

//*START LISTENING
app.listen(HOST_PORT, () => {
  console.log(`Server listening at ${HOST_DOMAIN}:${HOST_PORT}`);
});
