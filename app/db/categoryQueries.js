const pool = require("./pool.js");

async function createCategory({ title, description }) {
    const SQL = `
        INSERT INTO categories (title, description) 
        VALUES ($1, $2)
    `;

    try {
        await pool.query(SQL, [title, description]);
    }
    catch (error) {
        throw error;
    };
};

module.exports = {
    createCategory,
};