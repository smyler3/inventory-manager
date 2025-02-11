require('dotenv').config();
const express = require('express');
const path = require('path');
const indexController = require('./controllers/indexController');
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');

const PORT = process.env.PORT || 3000;
const app = express();

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/categories", categoryRouter);
app.get("/categories/:categoryID/products", productRouter);
app.get("*", indexRouter);


app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});