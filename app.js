const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const userRouter = require("./routes/api/users");
const roomRouter = require("./routes/api/rooms");
const messagesRouter = require("./routes/api/messages");

// const { FRONTEND_URL } = process.env;
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const corsOptions = {
//   origin: FRONTEND_URL,
//   optionsSuccessStatus: 200,
// };

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/messages", messagesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
