const { validationResult } = require("express-validator");
const categoryQueries = require("../db/categoryQueries");
const productQueries = require("../db/productQueries");
const productValidator = require("../validators/productValidators");

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryID } = req.params;
        const category = await categoryQueries.getCategoryByID(categoryID);

        if (!category) {
            return res.status(404).render("layout", {
                title: "404 Page Not Found",
                body: "404",
                message: "Category not found" 
            });
        }

        const products = await productQueries.getProductsByCategoryID(categoryID);
        const options = [];

        res.render("layout", {
            title: category.title,
            body: "category",
            categoryID: categoryID,
            category: category,
            products: products,
            options: options,
        });
    }
    catch (error) {
        console.error(error);
        res.redirect("/500");
    }
};

const getCreateProductPage = (req, res) => {
    const { categoryID } = req.params;
    res.render("layout", {
        title: "Create A Product",
        body: "createProduct",
        categoryID: categoryID,
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
        const { categoryID } = req.params;
        const errors = validationResult(req);
        console.log("errors", errors);

        if (!errors.isEmpty()) {
            res.status(400).render("layout", {
                title: "Create A Product",
                body: "createProduct",
                categoryID: categoryID,
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
            const {
                productTitle,
                productDescription,
                salePrice,
                stockCount,
                lowStockCount,
                criticalStockCount,
            } = req.body;

            await productQueries.createProduct(
                categoryID,
                productTitle,
                productDescription,
                salePrice,
                stockCount,
                lowStockCount,
                criticalStockCount,
            );
            res.status(201).redirect(`/categories/${categoryID}/products`);
        }
        catch (error) {
            console.error(error);
            res.redirect("/500");
        }
    },
];

const getEditProductPage = (req, res) => {  
    res.send("Edit product page");
}; 

const postEditProduct = (req, res) => { 
    res.send("Edit product");
};

const postDeleteProduct = (req, res) => {   
    res.send("Delete product");
};  

const getProductByID = (req, res) => {
    res.send("Product by ID");
};

module.exports = {
    getProductsByCategory,
    getCreateProductPage,
    postCreateProduct,
    getEditProductPage,
    postEditProduct,
    postDeleteProduct,
    getProductByID,
};