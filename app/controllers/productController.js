const categoryQueries = require("../db/categoryQueries");
const productQueries = require("../db/productQueries");

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
        res.status(500).render("layout", {
            title: "500 Internal Server Error",
            body: "500",
        });
    }
};

const getCreateProductPage = (req, res) => {
    res.send("Create product page");
};

const postCreateProduct = (req, res) => {
    res.send("Create product");
};

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