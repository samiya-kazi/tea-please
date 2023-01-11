const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGOOSE_URI;

const app = express();
app.use(cors());


(async function bootstrap () {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB.');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
})();