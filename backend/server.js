// backend/backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./config/db")();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

app.listen(5000);
