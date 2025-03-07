const { body } = require("express-validator");
const errorMessages = require("./errorMessages.js");

const PRODUCT_TITLE_MAX_LENGTH = 256;
const PRODUCT_DESCRIPTION_MAX_LENGTH = 1024;
const MIN_SALE_PRICE = 0;
const MAX_SALE_PRICE = 1000000;
const MIN_STOCK_COUNT = 0;
const MAX_STOCK_COUNT = 1000000;
const CORRECT_PASSWORD = "test";

const validateCreateCategory = [
    
]

module.exports = {
    PRODUCT_TITLE_MAX_LENGTH,
    PRODUCT_DESCRIPTION_MAX_LENGTH,
    MIN_SALE_PRICE,
    MAX_SALE_PRICE,
    MIN_STOCK_COUNT,
    MAX_STOCK_COUNT,
}