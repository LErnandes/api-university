require('dotenv').config();
const express = require("express");
const user = require("./routes/user");
const university = require("./routes/university");
const InitiateMongoServer = require("./config/db");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("./swagger_output.json");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.static("dist"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

/**
 * Router Middleware
 * Router - /universities/*
 * Method - *
 */
app.use("/universities", university);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
