const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/new", categoryController.getCreateCategoryPage);
categoryRouter.post("/new", categoryController.postCreateCategory);
categoryRouter.get("/:categoryID/edit", categoryController.getEditCategoryPage);
categoryRouter.post("/:categoryID/edit", categoryController.postEditCategory);
categoryRouter.get("/:categoryID/delete", categoryController.getDeleteCategory);
categoryRouter.post("/:categoryID/delete", categoryController.postDeleteCategory);

module.exports = categoryRouter;