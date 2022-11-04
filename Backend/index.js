require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./routes/v1");


const PORT = 8082;

const DB_URI = "mongodb://127.0.0.1:27017/lystloc";
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Connected to database at ${DB_URI} ...`);
  })
  .catch((err) => {
    console.log(
      `Could not connect to database at ${DB_URI} because of ${err.message}`
    );
  });

app.use(express.json());

app.use("/", route);


app.listen(PORT, () => {
  console.log("Server started on ", PORT);
});


// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log("Hello from Server");
// res.write("<h1>Hello</h1>");
// res.end();
// });

// server.listen(8082, () => {
//   console.log("Listening...");
// });