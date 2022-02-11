const express = require("express");
const path = require("path");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

const app = express();

const port = process.env.PORT;

//bd
dbConnection();

app.use(cors());

//parseo de la informacion
app.use(express.json());

//directorio publico

app.use(express.static("public"));

//routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/cliente", require("./routes/cliente"));
app.use("/api/articulo", require("./routes/articulo"));

//directorio necesario para rutas
app.get(["/", "/*"], (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto.. ${port}`);
});
