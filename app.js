require('dotenv').config();

// # INIT EXPRESS
const express = require("express");
// const cors = require('cors');
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;






//*START LISTENING
app.listen(port, () => {
    console.log(`Server listening to ${domain}:${port}`);
  });