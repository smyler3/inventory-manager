const { validationResult } = require("express-validator");
const categoryValidator = require("../validators/categoryValidators.js");
const categoryStorage = require("../db/categoryStorage.js");

const getAllCategories = (req, res) => {
    res.send("Get all categories");
};

const getCreateCategoryPage = (req, res) => {
    console.log("here");
    res.render("createCategory", { 
        title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
        description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
    });
};

const postCreateCategory = [
    categoryValidator.validateCreateCategory,
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("createCategory", {
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
                errors: errors.errors,
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