const { Router } = require('express');

const productRouter = Router();

productRouter.get("/", productController.getProductsByCategory);
productRouter.get("/new", productController.getCreateProductPage);
productRouter.post("/new", productController.postCreateProduct);
productRouter.get("/:productID/edit", productController.getEditProductPage);
productRouter.post("/:productID/edit", productController.postEditProduct);
productRouter.post("/:productID/delete", productController.postDeleteProduct);
productRouter.get("/:productID", productController.getProductByID);

module.exports = productRouter;