const express = require("express");
const transactionsArray = require("../models/transaction");
const transactions = express.Router();

// Get all transactions
transactions.get("/", (_, response) => {
  console.log("GET request to /transactions");
  response.json(transactionsArray);
});

// Get transaction at index
transactions.get("/:index", (request, response) => {
  const { index } = request.params;
  if (transactionsArray[index]) {
    console.log(`GET request to /transactions/${index}`);
    response.json(transactionsArray[index]);
  } else {
    response.redirect(404).json({ error: "Resource not found" });
  }
});

// Creat transaction
transactions.post("/", (request, response) => {
  console.log("POST to /transactions");
  transactionsArray.push(request.body);
  response.status(201).json(transactionsArray);
});

// Delete transaction
transactions.delete("/:index", (request, response) => {
  const { index } = request.params;
  if (transactionsArray[index]) {
    console.log(`DELETE at ${index}`);
    const deleteTrans = transactionsArray.splice(index, 1)[0];
    response.status(200).json(deleteTrans);
  } else {
    response.status(404).json({ error: "Transaction Not Found" });
  }
});

// Update transaction
transactions.put("/:index", (request, response) => {
  const { index } = request.params;
  if (transactionsArray[index]) {
    console.log(`UPDATED at ${index}`);
    transactionsArray[index] = request.body;
    response.status(200).json(transactionsArray[index]);
  } else {
    response.status(404).json({ error: "Transaction Not Found" });
  }
});

module.exports = transactions;
