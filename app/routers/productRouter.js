const { Router } = require("express");
const productController = require("../controllers/productController.js");

const productRouter = Router({ mergeParams: true });

productRouter.get("/", productController.getProductsByCategory);
productRouter.get("/new", productController.getCreateProductPage);
productRouter.post("/new", productController.postCreateProduct);
productRouter.get("/:productID/edit", productController.getEditProductPage);
productRouter.post("/:productID/edit", productController.postEditProduct);
productRouter.get("/:productID/delete", productController.getDeleteProduct);
productRouter.post("/:productID/delete", productController.postDeleteProduct);
productRouter.get("/:productID", productController.getProductByID);

module.exports = productRouter;