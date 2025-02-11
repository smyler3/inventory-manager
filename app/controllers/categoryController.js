const getAllCategories = (req, res) => {
    res.send("All categories");
};

const getCreateCategoryPage = (req, res) => {
    res.send("Create category page");
};

const postCreateCategory = (req, res) => {
    res.send("Create category");
};

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