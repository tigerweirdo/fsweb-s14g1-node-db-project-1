const express = require("express");
const accountRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

server.use("/api/accounts",accountRouter);

//GLOBAL error handler
server.use((err, req, res, next) => { // eslint-disable-line
    // KODLAR BURAYA
    res.status((err.status || 500)).json({
      customMessage:"Global error handler üzerinde hata oluştu",
      message:err.message
    })
  });
module.exports = server;