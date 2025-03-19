const { validationResult } = require("express-validator");
const categoryQueries = require("../db/categoryQueries");
const productQueries = require("../db/productQueries");
const productValidator = require("../validators/productValidators");
const { PRODUCT_SORT_OPTIONS, applyProductSort, applyProductFilters } = require("../utils/filters");

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryID } = req.params;
        const { sort, search } = req.query;
        const searchFilter = search ? search.trim() : undefined;
        const category = await categoryQueries.getCategoryByID(categoryID);

        if (!category) {
            return res.status(404).render("layout", {
                title: "404 Page Not Found",
                body: "404",
                message: "Category not found" 
            });
        };

        const rawProducts = await productQueries.getProductsByCategoryID(categoryID);
        const products = applyProductFilters(rawProducts, searchFilter, sort);

        res.render("layout", {
            title: category.title,
            body: "category",
            categoryID: categoryID,
            category: category,
            products: products,
            action: `/categories/${categoryID}/products`,
            search: searchFilter,
            sort: sort,
            options: PRODUCT_SORT_OPTIONS,
        });
    }
    catch (error) {
        console.error(error);
        res.redirect("/500");
    }
};

const getCreateProductPage = async(req, res) => {
    const { categoryID } = req.params;

    if (!(await categoryQueries.getCategoryByID(categoryID))) {
        return res.status(404).render("layout", {
            title: "404 Page Not Found",
            body: "404",
            message: "Category not found" 
        });
    };

    res.render("layout", {
        title: "Create A Product",
        body: "createProduct",
        categoryID: categoryID,
        product: {},
        title_max_length: productValidator.PRODUCT_TITLE_MAX_LENGTH, 
        description_max_length: productValidator.PRODUCT_DESCRIPTION_MAX_LENGTH, 
        min_sale_price: productValidator.MIN_SALE_PRICE,
        max_sale_price: productValidator.MAX_SALE_PRICE,
        min_stock_count: productValidator.MIN_STOCK_COUNT,
        max_stock_count: productValidator.MAX_STOCK_COUNT,
    });
};

const postCreateProduct = [
    productValidator.validateCreateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        const { categoryID } = req.params;
        const {
            title,
            description,
            sale_price,
            stock_count,
            low_stock_count,
            critical_stock_count,
        } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render("layout", {
                title: "Create A Product",
                body: "createProduct",
                categoryID: categoryID,
                product: {
                    title,
                    description,
                    sale_price,
                    stock_count,
                    low_stock_count,
                    critical_stock_count,
                },
                title_max_length: productValidator.PRODUCT_TITLE_MAX_LENGTH, 
                description_max_length: productValidator.PRODUCT_DESCRIPTION_MAX_LENGTH, 
                min_sale_price: productValidator.MIN_SALE_PRICE,
                max_sale_price: productValidator.MAX_SALE_PRICE,
                min_stock_count: productValidator.MIN_STOCK_COUNT,
                max_stock_count: productValidator.MAX_STOCK_COUNT,
                errors: errors.errors,
            });
        }

        try {
            await productQueries.createProduct(
                categoryID,
                title,
                description,
                sale_price,
                stock_count,
                low_stock_count,
                critical_stock_count,
            );
            res.status(201).redirect(`/categories/${categoryID}/products`);
        }
        catch (error) {
            console.error(error);
            res.redirect("/500");
        }
    },
];

const getEditProductPage = async (req, res) => {  
    const { categoryID, productID } = req.params;
    const category = await categoryQueries.getCategoryByID(categoryID);
    const product = await productQueries.getProductByID(productID);

    if (!category | !product) {
        return res.status(404).render("layout", {
            title: "404 Page Not Found",
            body: "404",
            message: "Category or product not found" 
        });
    };

    res.render("layout", {
        title: "Edit a Product",
        body: "editProduct",
        category: category,
        product: product,
        title_max_length: productValidator.PRODUCT_TITLE_MAX_LENGTH, 
        description_max_length: productValidator.PRODUCT_DESCRIPTION_MAX_LENGTH, 
        min_sale_price: productValidator.MIN_SALE_PRICE,
        max_sale_price: productValidator.MAX_SALE_PRICE,
        min_stock_count: productValidator.MIN_STOCK_COUNT,
        max_stock_count: productValidator.MAX_STOCK_COUNT,
    });
}; 

const postEditProduct = [
    productValidator.validateEditProduct,
    async (req, res) => { 
        const errors = validationResult(req);
        const { categoryID, productID } = req.params;
        const {
            title,
            description,
            sale_price,
            stock_count,
            low_stock_count,
            critical_stock_count
        } = req.body;

        if (!errors.isEmpty()) {
            const category = await categoryQueries.getCategoryByID(categoryID);
            return res.status(400).render("layout", {
                title: "Edit a Product",
                body: "editProduct",
                category: category,
                product: {
                    id: productID,
                    title,
                    description,
                    sale_price,
                    stock_count,
                    low_stock_count,
                    critical_stock_count
                },
                title_max_length: productValidator.PRODUCT_TITLE_MAX_LENGTH, 
                description_max_length: productValidator.PRODUCT_DESCRIPTION_MAX_LENGTH, 
                min_sale_price: productValidator.MIN_SALE_PRICE,
                max_sale_price: productValidator.MAX_SALE_PRICE,
                min_stock_count: productValidator.MIN_STOCK_COUNT,
                max_stock_count: productValidator.MAX_STOCK_COUNT,
                errors: errors.errors,
            })
        };

        try {
            await productQueries.editProduct(
                productID,
                title,
                description,
                sale_price,
                stock_count,
                low_stock_count,
                critical_stock_count,
            );
            res.status(200).redirect(`/categories/${categoryID}/products`);
        }
        catch (error) {
            console.error("Error editing product:", error);
            res.redirect("/500");
        };
    },
];

const getDeleteProduct = async (req, res) => {   
    const { categoryID, productID } = req.params;
    const category = await categoryQueries.getCategoryByID(categoryID);
    const product = await productQueries.getProductByID(productID);

    if (!category | !product) {
        return res.status(404).render("layout", {
            title: "404 Page Not Found",
            body: "404",
            message: "Category or product not found" 
        });
    };

    res.render("layout", {
        title: "Delete a Product",
        body: "deleteProduct",
        category: category,
        product: product,
    });
};  

const postDeleteProduct = [
    productValidator.validateDeleteProduct,
    async (req, res) => {   
        const errors = validationResult(req);
        const { categoryID, productID } = req.params;

        if (!errors.isEmpty()) {
            const category = await categoryQueries.getCategoryByID(categoryID);
            const product = await productQueries.getProductByID(productID);

            return res.status(400).render("layout", {
                title: "Delete a product",
                body: "deleteProduct",
                category: category,
                product: product,
                errors: errors.errors,
            });
        };

        try {
            await productQueries.deleteProduct(productID);
            res.redirect(`/categories/${categoryID}/products`);
        }
        catch (error) {
            console.error("Error deleting product:", error);
            res.redirect("/500");
        };
    },
];  

const getProductByID = (req, res) => {
    res.send("Product by ID");
};

module.exports = {
    getProductsByCategory,
    getCreateProductPage,
    postCreateProduct,
    getEditProductPage,
    postEditProduct,
    getDeleteProduct,
    postDeleteProduct,
    getProductByID,
};