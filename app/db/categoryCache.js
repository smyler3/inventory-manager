let categoryCache = { data: null, lastFetch: 0 };
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

function checkCategoryCacheInvalid() {
    return (!categoryCache.data || Date.now() - categoryCache.lastFetch > CACHE_DURATION);
};

function getCategoryCacheData() {
    return categoryCache.data;
}

function updateCategoryCache(data, lastFetch) {
    categoryCache.data = data;
    categoryCache.lastFetch = lastFetch;
};

function clearCategoryCache() {
    categoryCache = { data: null, lastFetch: 0 };
};

module.exports = {
    checkCategoryCacheInvalid,
    getCategoryCacheData,
    updateCategoryCache,
    clearCategoryCache,
};