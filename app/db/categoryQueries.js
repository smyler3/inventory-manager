const pool = require("./pool.js");
const categoryCache = require("./categoryCache.js");

async function createCategory(title, description) {
    const SQL = `
        INSERT INTO categories (title, description) 
        VALUES ($1, $2)
    `;

    await pool.query(SQL, [title, description]);
    categoryCache.clearCategoryCache();
};

async function editCategory(categoryID, title, description) {
    const SQL = `
        UPDATE categories
        SET title = $1, description = $2
        WHERE id = $3;
    `;

    await pool.query(SQL, [title, description, categoryID]);
    categoryCache.clearCategoryCache();
}

async function deleteCategory(id) {
    const SQL = `
        DELETE FROM categories
        WHERE id=$1 
    `;

    await pool.query(SQL, [id]);
    categoryCache.clearCategoryCache();
};

async function getAllCategories() {
    if (categoryCache.checkCategoryCacheInvalid()) {
        const SQL = `
            SELECT * FROM categories
        `;
        const { rows } = await pool.query(SQL);

        categoryCache.updateCategoryCache(rows, Date.now());

        return rows;
    }
    return categoryCache.getCategoryCacheData();
};

async function getCategoryByID(categoryID) {
    const categories = await getAllCategories();
    const category = categories.find(x => x.id === Number(categoryID)) || null;

    return category;
};

module.exports = {
    createCategory,
    editCategory,
    deleteCategory,
    getAllCategories,
    getCategoryByID,
};