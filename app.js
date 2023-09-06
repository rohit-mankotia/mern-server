require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./connection");
const routes = require("./routes/routes");
const { html } = require("./utils/utils");

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cors());

app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.type("html").send(html));

app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
