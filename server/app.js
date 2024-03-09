const express = require("express");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("server start");
});

module.exports = app;
