const pool = require("./pool.js");

async function createCategory(title, description) {
    const SQL = `
        INSERT INTO categories (title, description) 
        VALUES ($1, $2)
    `;

    await pool.query(SQL, [title, description]);
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
    getAllCategories,
};