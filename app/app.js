require("dotenv").config();
const express = require("express");
const path = require("path");
const indexRouter = require("./routers/indexRouter")
const categoryRouter = require("./routers/categoryRouter");
const productRouter = require("./routers/productRouter");
const favicon = require("serve-favicon");

const PORT = process.env.PORT || 3000;
const app = express();

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(favicon(path.join(__dirname, "public", "favicon.svg")));
app.use(express.urlencoded({ extended: true }));

// Allow styling
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Routes
app.use("/categories", categoryRouter);
app.use("/categories/:categoryID/products", productRouter);
app.use("/", indexRouter);


app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});