const { Router } = require("express");
const indexController = require("../controllers/indexController.js");
const productController = require("../controllers/productController.js");

const indexRouter = Router();

indexRouter.get("/products", productController.getAllProductsPage);
indexRouter.get("/500", indexController.get500Page);
indexRouter.get("/", indexController.getIndexPage);
indexRouter.get("*", indexController.get404Page);

module.exports = indexRouter;