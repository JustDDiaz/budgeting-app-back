const transactionsControllers = require("./controllers/transactionsControllers");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, response) => {
  console.log("GET request to /");
  response.send("Hello world");
});

app.use("/transactions", transactionsControllers);

app.get("*", (_, response) => {
  response.status(404).json({ error: "Page not found" });
});

module.exports = app;
