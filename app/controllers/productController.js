const getProductsByCategory = (req, res) => {
    res.send("Products by category");
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