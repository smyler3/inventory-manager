const pool = require("./pool.js");
const categoryCache = require("./categoryCache.js");

async function createCategory(title, description) {
    const SQL = `
        INSERT INTO categories (title, description) 
        VALUES ($1, $2);
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
};

async function deleteCategory(id) {
    const SQL = `
        DELETE FROM categories
        WHERE id=$1; 
    `;

    await pool.query(SQL, [id]);
    categoryCache.clearCategoryCache();
};

async function getAllCategories(search) {
    if (categoryCache.checkCategoryCacheInvalid()) {
        const SQL = `
            SELECT categories.*, 
                COUNT(products.id) AS product_count, 
                SUM(CASE WHEN products.stock_count <= products.low_stock_count AND products.stock_count > products.critical_stock_count THEN 1 ELSE 0 END) AS low_warnings,
                SUM(CASE WHEN products.stock_count <= products.critical_stock_count THEN 1 ELSE 0 END) AS critical_warnings
            FROM categories
            LEFT JOIN products ON categories.id = products.category_id
            GROUP BY categories.id;
        `;
        const { rows } = await pool.query(SQL);

        categoryCache.updateCategoryCache(rows, Date.now());

        return rows;
    };
    
    return categoryCache.getCategoryCacheData();
};

async function getCategoriesBySearch(search) {
    if (categoryCache.checkCategoryCacheInvalid()) {
        const SQL = `
            SELECT categories.*, 
                COUNT(products.id) AS product_count, 
                SUM(CASE WHEN products.stock_count <= products.low_stock_count AND products.stock_count > products.critical_stock_count THEN 1 ELSE 0 END) AS low_warnings,
                SUM(CASE WHEN products.stock_count <= products.critical_stock_count THEN 1 ELSE 0 END) AS critical_warnings
            FROM categories
            LEFT JOIN products ON categories.id = products.category_id
            WHERE categories.title ILIKE '%' || $1 || '%'
            GROUP BY categories.id;
        `;
        const { rows } = await pool.query(SQL, [search]);

        return rows;
    };
    
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
    getCategoriesBySearch,
    getCategoryByID,
};