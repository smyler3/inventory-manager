let productCache = { data: null, lastFetch: 0 };
const CACHE_DURATION = 1000 * 60 * 60 * 2; // 2 hours

function checkProductCacheInvalid() {
    return (!productCache.data || Date.now() - productCache.lastFetch > CACHE_DURATION);
};

function getProductCacheData() {
    return productCache.data;
};

function updateProductCache(data, lastFetch) {
    productCache.data = data;
    productCache.lastFetch = lastFetch;
};

function clearProductCache() {
    productCache = { data: null, lastFetch: 0 };
};

module.exports = {
    checkProductCacheInvalid,
    getProductCacheData,
    updateProductCache,
    clearProductCache,
};