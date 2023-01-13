const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
const http = require("http");
const { Server } = require("socket.io");
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

const server = http.createServer(app);

(async function bootstrap () {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB.');
    server.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
})();


// Socket IO Logic


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("join_room", ()=> {
    socket.join("kitchen");
  })

  socket.on("post_order", (data) => {
    socket.to("kitchen").emit("receive_order", data);
  });
});