const pool = require("./pool.js");

async function createCategory(title, description) {
    const SQL = `
        INSERT INTO categories (title, description) 
        VALUES ($1, $2)
    `;

    await pool.query(SQL, [title, description]);
};

async function deleteCategory(id) {
    const SQL = `
        DELETE FROM categories
        WHERE id=$1 
    `;

    await pool.query(SQL, [id]);
};

async function getAllCategories() {
    const SQL = `
        SELECT * FROM categories
    `;

    const { rows } = await pool.query(SQL);
    return rows;
};

module.exports = {
    createCategory,
    deleteCategory,
    getAllCategories,
};