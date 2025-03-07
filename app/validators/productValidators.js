const { body } = require("express-validator");
const errorMessages = require("./errorMessages.js");

const PRODUCT_TITLE_MIN_LENGTH = 1;
const PRODUCT_TITLE_MAX_LENGTH = 256;
const PRODUCT_DESCRIPTION_MIN_LENGTH = 1;
const PRODUCT_DESCRIPTION_MAX_LENGTH = 1024;
const MIN_SALE_PRICE = 0;
const MAX_SALE_PRICE = 1000000;
const MIN_STOCK_COUNT = 0;
const MAX_STOCK_COUNT = 1000000;
const CORRECT_PASSWORD = "test";

const validateCreateProduct = [
    body("productTitle")
        .trim()
        .notEmpty()
        .withMessage(`Title ${errorMessages.EMPTY_ERROR}`)

        .isAlpha("en-AU", { ignore: " "})
        .withMessage(`Title ${errorMessages.ALPHA_ERROR}`)

        .isLength({ min: PRODUCT_TITLE_MIN_LENGTH, max: PRODUCT_TITLE_MAX_LENGTH})
        .withMessage(`Title ${errorMessages.LENGTH_ERROR(
            PRODUCT_TITLE_MIN_LENGTH, 
            PRODUCT_TITLE_MAX_LENGTH
        )}`),

    body("productDescription")
        .trim()
        .notEmpty()
        .withMessage(`Description ${errorMessages.EMPTY_ERROR}`)

        .matches(/^[A-Za-z0-9 .,'!&"\/\-+=_\[\]:;\$?]+$/)
        .withMessage(`Description ${errorMessages.ALPHANUMERIC_ERROR}`)

        .isLength({ min: PRODUCT_DESCRIPTION_MIN_LENGTH, max: PRODUCT_DESCRIPTION_MAX_LENGTH })
        .withMessage(`Description ${errorMessages.LENGTH_ERROR(
            PRODUCT_DESCRIPTION_MIN_LENGTH, 
            PRODUCT_DESCRIPTION_MAX_LENGTH
        )}`),

    body("salePrice")
        .isFloat({ min: MIN_SALE_PRICE, max: MAX_SALE_PRICE })
        .withMessage(`Sale Price ${errorMessages.BOUND_ERROR(
            MIN_SALE_PRICE, 
            MAX_SALE_PRICE
        )}`),

    body("stockCount")
        .isInt({ min: MIN_STOCK_COUNT, max: MAX_STOCK_COUNT })
        .withMessage(`Stock Count ${errorMessages.BOUND_ERROR(
            MIN_STOCK_COUNT, 
            MAX_STOCK_COUNT
        )}`),

    body("lowStockCount")
        .isInt({ min: MIN_STOCK_COUNT, max: MAX_STOCK_COUNT })
        .withMessage(`Low Stock Count ${errorMessages.BOUND_ERROR(
            MIN_STOCK_COUNT, 
            MAX_STOCK_COUNT
        )}`),

    body("criticalStockCount")
        .isInt({ min: MIN_STOCK_COUNT, max: MAX_STOCK_COUNT })
        .withMessage(`Critical Stock Count ${errorMessages.BOUND_ERROR(
            MIN_STOCK_COUNT, 
            MAX_STOCK_COUNT
        )}`)
        .custom((value, { req }) => {
            const lowStockCount = req.body.lowStockCount;
            if (value > lowStockCount) {
                throw new Error("Critical Stock Count must be less than or equal to Low Stock Count");
            }
            return true;
        }),
];

module.exports = {
    PRODUCT_TITLE_MAX_LENGTH,
    PRODUCT_DESCRIPTION_MAX_LENGTH,
    MIN_SALE_PRICE,
    MAX_SALE_PRICE,
    MIN_STOCK_COUNT,
    MAX_STOCK_COUNT,
    validateCreateProduct,
}