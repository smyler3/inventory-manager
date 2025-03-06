const { validationResult } = require("express-validator");
const categoryValidator = require("../validators/categoryValidators.js");
const categoryQueries = require("../db/categoryQueries.js");

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryQueries.getAllCategories();
        res.render("layout", {
            title: "All Categories",
            body: "categories",
            categories: categories,
        });
    }
    catch (error) {
        console.error("Error rendering categories page:", error);
        res.status(500).render("layout", {
            title: "500 Internal Server Error",
            body: "500",
        });
    };
};

const getCreateCategoryPage = (req, res) => {
    res.render("layout", { 
        title: "Create A Category",
        body: "createCategory",
        title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
        description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
    });
};

const postCreateCategory = [
    categoryValidator.validateCreateCategory,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("layout", {
                title: "Create A Category",
                body: "createCategory",
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
            res.status(500).render("layout", {
                title: "500 Internal Server Error",
                body: "500",
            });
        };
    },
];

const getEditCategoryPage = async (req, res) => {
    const { categoryID } = req.params;

    const category = await categoryQueries.getCategoryByID(categoryID);

    res.render("layout", {
        title: "Edit A Category",
        body: "editCategory",
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
            return res.status(400).render("layout", {
                title: "Edit A Category",
                body: "editCategory",
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
            res.status(500).render("layout", {
                title: "500 Internal Server Error",
                body: "500",
            });
        };
    },
];

const getDeleteCategory = async (req, res) => {
    const { categoryID } = req.params;
    const category = await categoryQueries.getCategoryByID(categoryID);

    res.render("layout", {
        title: "Delete A Category",
        body: "deleteCategory",
        categoryID: categoryID,
        category: category,
    });
};

const postDeleteCategory = [
    categoryValidator.validateDeleteCategory,
    async (req, res) => {
        const errors = validationResult(req);
        const { categoryID } = req.params;
        const category = await categoryQueries.getCategoryByID(categoryID);

        if (!errors.isEmpty()) {
            return res.status(400).render("layout", {
                title: "Delete A Category",
                body: "deleteCategory",
                categoryID: categoryID,
                category: category,
                errors: errors.errors,
            });
        };

        try {
            await categoryQueries.deleteCategory(categoryID);
            res.status(204).redirect("/categories");
        }
        catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).render("layout", {
                title: "500 Internal Server Error",
                body: "500",
            });
        };
    },
];

module.exports = {
    getAllCategories,
    getCreateCategoryPage,
    postCreateCategory,
    getEditCategoryPage,
    postEditCategory,
    getDeleteCategory,
    postDeleteCategory,
};