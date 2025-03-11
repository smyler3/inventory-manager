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
        label: "Alphabetical (a-z)",
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
        label: "Alphabetical (z-a)",
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

function applyProductSort(products, sortID) {
    let sort = null;
    if (!sortID) {
        sort = PRODUCT_SORT_OPTIONS.find(x => x.id === 0);
    }
    else {
        sort = PRODUCT_SORT_OPTIONS.find(x => x.id === Number(sortID));
    }

    return products.sort(sort.sortFunction);
}

module.exports = {
    PRODUCT_SORT_OPTIONS,
    applyProductSort,
};