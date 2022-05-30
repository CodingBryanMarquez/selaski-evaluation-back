const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const server = express();
apiPort = process.env.PORT ? process.env.PORT : 3000;

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(require("./routes/index"));

server.listen(apiPort, function () {
  console.log("server running on the port: " + apiPort);
});
