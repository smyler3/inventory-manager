const pool = require("./pool");
const productCache = require("./productCache");

async function createProduct(
    categoryID,
    productTitle, 
    productDescription, 
    salePrice, 
    stockCount, 
    lowStockCount, 
    criticalStockCount
) {
    const SQL = `
        INSERT INTO products (category_id, title, description, sale_price, stock_count, low_stock_count, critical_stock_count)
        VALUES($1, $2, $3, $4, $5, $6, $7);
    `;

    await pool.query(SQL, [
        categoryID,
        productTitle, 
        productDescription, 
        salePrice, 
        stockCount, 
        lowStockCount, 
        criticalStockCount
    ]);
    productCache.clearProductCache();
};

async function getAllProducts() {
    if (productCache.checkProductCacheInvalid()) {
        const SQL = `
            SELECT *
            FROM products;
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
    createProduct,
    getAllProducts,
    getProductsByCategoryID,
};