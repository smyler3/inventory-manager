const { validationResult } = require("express-validator");
const { validateCreateCategory } = require("../validators/categoryValidators.js");

const getAllCategories = (req, res) => {
    res.send("All categories");
};

const getCreateCategoryPage = (req, res) => {
    res.send("Get create category");
};

const postCreateCategory = [
    validateCreateCategory,
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("createCategory", {
                errors: errors,
            });
        };

        const { categoryTitle, categoryDescription } = req.body;
        // TODO: Add category storage
        categoryStorage.createCategory({ categoryTitle, categoryDescription });
        res.redirect("/categories");
    },
];

const getEditCategoryPage = (req, res) => {
    res.send("Edit category page");
};

const postEditCategory = (req, res) => {
    res.send("Edit category");
};

const postDeleteCategory = (req, res) => {
    res.send("Delete category");
};

const getCategoryByID = (req, res) => {
    res.send("Category by ID");
};

module.exports = {
    getAllCategories,
    getCreateCategoryPage,
    postCreateCategory,
    getEditCategoryPage,
    postEditCategory,
    postDeleteCategory,
    getCategoryByID,
};