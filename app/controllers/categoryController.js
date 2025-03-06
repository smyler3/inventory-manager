const { validationResult } = require("express-validator");
const categoryValidator = require("../validators/categoryValidators.js");
const categoryQueries = require("../db/categoryQueries.js");

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryQueries.getAllCategories();
        res.render("categories", {
            categories: categories,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
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
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("createCategory", {
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
                errors: errors.errors,
            });
        };

        try {
            const { categoryTitle, categoryDescription } = req.body;

            await categoryQueries.createCategory(categoryTitle, categoryDescription);
            res.status(201).redirect("/categories");
        }
        catch (error) {
            console.error("Error creating category:", error);
            res.status(500).render("createCategory", {
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
                errors: [{ msg: error.message || "Something went wrong while creating the category. Please try again." }],
            });
        };
    },
];

const getEditCategoryPage = async (req, res) => {
    const { categoryID } = req.params;
    const category = await categoryQueries.getCategoryByID(categoryID);

    res.render("editCategory", {
        categoryID: categoryID,
        category: category,
        title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
        description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH,
    });
};

const postEditCategory = [
    categoryValidator.validateEditCategory,
    async (req, res) => {
        const errors = validationResult(req);
        const { categoryID } = req.params;
        const { newCategoryTitle, newCategoryDescription } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render("editCategory", {
                categoryID: categoryID,
                category: { title: newCategoryTitle, description: newCategoryDescription },
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH,
                errors: errors.errors,
            });
        };

        try {
            await categoryQueries.editCategory(categoryID, newCategoryTitle, newCategoryDescription);
            res.status(200).redirect("/categories");
        }
        catch (error) {
            console.error("Error editing category:", error);
            res.status(500).render("editCategory", {
                categoryID: categoryID,
                category: { title: newCategoryTitle, description: newCategoryDescription },
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH,
                errors: [{ msg: error.message || "Something went wrong while deleting the category. Please try again." }],
            });
        };
    },
];

const getDeleteCategory = async (req, res) => {
    const { categoryID } = req.params;

    res.render("deleteCategory", {
        categoryID: categoryID,
    });
};

const postDeleteCategory = [
    categoryValidator.validateDeleteCategory,
    async (req, res) => {
        const errors = validationResult(req);
        const { categoryID } = req.params;

        if (!errors.isEmpty()) {
            return res.status(400).render("deleteCategory", {
                categoryID: categoryID,
                errors: errors.errors,
            });
        };

        try {
            await categoryQueries.deleteCategory(categoryID);
            res.status(204).redirect("/categories");
        }
        catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).render("deleteCategory", {
                errors: [{ msg: error.message || "Something went wrong while deleting the category. Please try again." }],
            });
        };
    },
];

const getCategoryByID = (req, res) => {
    res.send("Category by ID");
};

module.exports = {
    getAllCategories,
    getCreateCategoryPage,
    postCreateCategory,
    getEditCategoryPage,
    postEditCategory,
    getDeleteCategory,
    postDeleteCategory,
    getCategoryByID,
};