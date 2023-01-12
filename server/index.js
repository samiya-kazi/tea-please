const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGOOSE_URI;

const corsConfig = {
  origin: "http://localhost:4200",
  exposedHeaders: ['Authorization'],
  credentials: true
}

const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(router);


(async function bootstrap () {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB.');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
})();