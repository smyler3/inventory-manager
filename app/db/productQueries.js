const pool = require("./pool");
const productCache = require("./productCache");

async function getAllProducts() {
    if (productCache.checkProductCacheInvalid()) {
        const SQL = `
            SELECT *
            FROM products
        `;
        const { rows } = await pool.query(SQL);

        productCache.updateProductCache(rows, Date.now());

        return rows;
    };

    return productCache.getProductCacheData();
};

async function getProductsByCategoryID(categoryID) {
    const data = await getAllProducts();
    const filteredData = data.filter(x => x.category_id === Number(categoryID));

    return filteredData;
};

module.exports = {
    getAllProducts,
    getProductsByCategoryID,
};