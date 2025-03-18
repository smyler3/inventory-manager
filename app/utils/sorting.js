const PRODUCT_SORT_OPTIONS = [
    {
        id: 0,
        label: "Date added (newest first)",
        sortFunction: (a, b) => a.id - b.id,
    },
    {
        id: 1,
        label: "Date added (oldest first)",
        sortFunction: (a, b) => b.id - a.id,
    },
    {
        id: 2,
        label: "Title (a-z)",
        sortFunction: (a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            else if (a.title > b.title) {
                return 1;
            }
            return 0;
        },
    },
    {
        id: 3,
        label: "Title (z-a)",
        sortFunction: (a, b) => {
            if (b.title < a.title) {
                return -1;
            }
            else if (b.title > a.title) {
                return 1;
            }
            return 0;
        },
    },
    {
        id: 4,
        label: "Stock count (low to high)",
        sortFunction: (a, b) => a.stock_count - b.stock_count,
    },
    {
        id: 5,
        label: "Stock count (high to low)",
        sortFunction: (a, b) => b.stock_count - a.stock_count,
    },
    {
        id: 6,
        label: "Warnings (most severe first)",
        sortFunction: (a, b) => {
            const aLevel = a.stock_count < a.critical_stock_count ? -1 : a.stock_count < a.low_stock_count ? 0 : 1;
            const bLevel =  b.stock_count < b.critical_stock_count ? -1 : b.stock_count < b.low_stock_count ? 0 : 1;
            return aLevel - bLevel;
        },
    },
    {
        id: 7,
        label: "Warnings (least severe first)",
        sortFunction: (a, b) => {
            const aLevel = a.stock_count < a.critical_stock_count ? 1 : a.stock_count < a.low_stock_count ? 0 : -1;
            const bLevel =  b.stock_count < b.critical_stock_count ? 1 : b.stock_count < b.low_stock_count ? 0 : -1;
            return aLevel - bLevel;
        },
    },
];

const CATEGORY_SORT_OPTIONS = [
    {
        id: 0,
        label: "Date added (newest first)",
        sortFunction: (a, b) => a.id - b.id,
    },
    {
        id: 1,
        label: "Date added (oldest first)",
        sortFunction: (a, b) => b.id - a.id,
    },
    {
        id: 2,
        label: "Title (a-z)",
        sortFunction: (a, b) => a.title.localeCompare(b.title),
    },
    {
        id: 3,
        label: "Title (z-a)",
        sortFunction: (a, b) => b.title.localeCompare(a.title),
    },
    {
        id: 4,
        label: "Products (most first)",
        sortFunction: (a, b) => b.product_count - a.product_count,
    },
    {
        id: 5,
        label: "Products (least first)",
        sortFunction: (a, b) => a.product_count - b.product_count,
    },
    {
        id: 6,
        label: "Low warnings (most first)",
        sortFunction: (a, b) => b.low_warnings - a.low_warnings,
    },
    {
        id: 7,
        label: "Low warnings (least first)",
        sortFunction: (a, b) => a.low_warnings - b.low_warnings,
    },
    {
        id: 8,
        label: "Critical warnings (most first)",
        sortFunction: (a, b) => b.critical_warnings - a.critical_warnings,
    },
    {
        id: 9,
        label: "Critical warnings (least first)",
        sortFunction: (a, b) => a.critical_warnings - b.critical_warnings,
    },
];

function applySort (items, sortID, sortOptions) {
    let sort = null;
    if (!sortID) {
        sort = sortOptions.find(x => x.id === 0);
    }
    else {
        sort = sortOptions.find(x => x.id === Number(sortID));
    }

    return items.sort(sort.sortFunction);
};

function applyProductSort(products, sortID) {
    return applySort(products, sortID, PRODUCT_SORT_OPTIONS);
};

function applyCategorySort(categories, sortID) {
    return applySort(categories, sortID, CATEGORY_SORT_OPTIONS);
};

module.exports = {
    PRODUCT_SORT_OPTIONS,
    CATEGORY_SORT_OPTIONS,
    applyProductSort,
    applyCategorySort,
};