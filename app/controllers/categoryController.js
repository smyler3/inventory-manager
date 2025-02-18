const { validationResult } = require("express-validator");
const categoryValidator = require("../validators/categoryValidators.js");
const categoryQueries = require("../db/categoryQueries.js");

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryQueries.getAllCategories();
        console.log(categories);
        res.render("categories", {
            categories: categories,
        });
    }
    catch (error) {
        console.log(error);
    };
};

const getCreateCategoryPage = (req, res) => {
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
        try {
            categoryQueries.createCategory({ categoryTitle, categoryDescription });
            res.status(201).redirect("/categories/");
        }
        catch (error) {
            console.error("Error creating category:", error);
            res.status(500).render("createCategory", {
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
                errors: [{ msg: error.message || "Something went wrong while creating the category. Please try again." }],
            });
        }
        
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