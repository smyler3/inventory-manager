const { validationResult } = require("express-validator");
const categoryValidator = require("../validators/categoryValidators.js");
const categoryQueries = require("../db/categoryQueries.js");
const { options } = require("../db/pool.js");
const { CATEGORY_SORT_OPTIONS, applyCategoryFilters } = require("../utils/filters.js");

const getAllCategories = async (req, res) => {
    try {
        const { sort, search } = req.query;
        const searchFilter = search ? search.trim() : undefined;
        const rawCategories = await categoryQueries.getAllCategories();
        const categories = applyCategoryFilters(rawCategories, searchFilter, sort);

        res.render("layout", {
            title: "All Categories",
            body: "categories",
            categories: categories,
            action: "/categories",
            search: searchFilter,
            sort: sort,
            options: CATEGORY_SORT_OPTIONS,
        });
    }
    catch (error) {
        console.error("Error rendering categories page:", error);
        res.redirect("/500");
    };
};

const getCreateCategoryPage = (req, res) => {
    res.render("layout", { 
        title: "Create A Category",
        body: "createCategory",
        category: {},
        title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
        description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
    });
};

const postCreateCategory = [
    categoryValidator.validateCreateCategory,
    async (req, res) => {
        const errors = validationResult(req);
        const { title, description } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render("layout", {
                title: "Create A Category",
                body: "createCategory",
                category: {
                    title, 
                    description,
                },
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH, 
                errors: errors.errors,
            });
        };

        try {
            await categoryQueries.createCategory(title, description);
            res.status(201).redirect("/categories");
        }
        catch (error) {
            console.error("Error creating category:", error);
            res.redirect("/500");
        };
    },
];

const getEditCategoryPage = async (req, res) => {
    const { categoryID } = req.params;

    const category = await categoryQueries.getCategoryByID(categoryID);

    if (!category) {
        return res.status(404).render("layout", {
            title: "404 Page Not Found",
            body: "404",
            message: "Category not found" 
        });
    };

    res.render("layout", {
        title: "Edit a Category",
        body: "editCategory",
        categoryID: categoryID,
        category: category,
        defaultTitle: category.title,
        title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
        description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH,
    });
};

const postEditCategory = [
    categoryValidator.validateEditCategory,
    async (req, res) => {
        const errors = validationResult(req);
        const { categoryID } = req.params;
        const { title, description } = req.body;

        if (!errors.isEmpty()) {
            const category = await categoryQueries.getCategoryByID(categoryID);

            if (!category) {
                return res.status(404).render("layout", {
                    title: "404 Page Not Found",
                    body: "404",
                    message: "Category not found" 
                });
            };
            
            return res.status(400).render("layout", {
                title: "Edit a Category",
                body: "editCategory",
                categoryID: categoryID,
                category: { 
                    title, 
                    description
                },
                defaultTitle: category.title,
                title_max_length: categoryValidator.CATEGORY_TITLE_MAX_LENGTH, 
                description_max_length: categoryValidator.CATEGORY_DESCRIPTION_MAX_LENGTH,
                errors: errors.errors,
            });
        };

        try {
            await categoryQueries.editCategory(categoryID, title, description);
            res.status(200).redirect(`/categories/${categoryID}/products`);
        }
        catch (error) {
            console.error("Error editing category:", error);
            res.redirect("/500");
        };
    },
];

const getDeleteCategory = async (req, res) => {
    const { categoryID } = req.params;
    const category = await categoryQueries.getCategoryByID(categoryID);

    if (!category) {
        return res.status(404).render("layout", {
            title: "404 Page Not Found",
            body: "404",
            message: "Category not found" 
        });
    };

    res.render("layout", {
        title: "Delete a Category",
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
                title: "Delete a Category",
                body: "deleteCategory",
                categoryID: categoryID,
                category: category,
                errors: errors.errors,
            });
        };

        try {
            await categoryQueries.deleteCategory(categoryID);
            res.status(204).redirect(`/categories`);
        }
        catch (error) {
            console.error("Error deleting category:", error);
            res.redirect("/500");
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