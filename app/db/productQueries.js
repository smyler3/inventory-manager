const pool = require("./pool");
const productCache = require("./productCache");

async function createProduct(
    categoryID,
    title, 
    description, 
    sale_price, 
    stock_count, 
    low_stock_count, 
    critical_stock_count
) {
    const SQL = `
        INSERT INTO products (category_id, title, description, sale_price, stock_count, low_stock_count, critical_stock_count)
        VALUES($1, $2, $3, $4, $5, $6, $7);
    `;

    await pool.query(SQL, [
        categoryID,
        title, 
        description, 
        sale_price, 
        stock_count, 
        low_stock_count, 
        critical_stock_count
    ]);
    productCache.clearProductCache();
};

async function deleteProduct(id) {
    const SQL = `
        DELETE FROM products
        WHERE id=$1;
    `;

    await pool.query(SQL, [id]);
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
    const products = await getAllProducts();
    const filteredData = products.filter(x => x.category_id === Number(categoryID));

    return filteredData;
};

async function getProductByID(productID) {
    const products = await getAllProducts();
    const product = products.find(x => x.id === Number(productID)) || null;

    return product;
};

module.exports = {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductsByCategoryID,
    getProductByID,
};