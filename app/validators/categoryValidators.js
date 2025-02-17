const { body } = require("express-validator");
const errorMessages = require("./errorMessages.js");

const CATEGORY_TITLE_MIN_LENGTH = 1;
const CATEGORY_TITLE_MAX_LENGTH = 256;
const CATEGORY_DESCRIPTION_MIN_LENGTH = 1;
const CATEGORY_DESCRIPTION_MAX_LENGTH = 1024;

const validateCreateCategory = [
    body("categoryTitle")
        .trim()
        .notEmpty()
        .withMessage("Title", errorMessages.EMPTY_ERROR)
        .isAlpha()
        .withMessage("Title", errorMessages.ALPHA_ERROR)
        .isLength({ min: CATEGORY_TITLE_MIN_LENGTH, max: CATEGORY_TITLE_MAX_LENGTH})
        .withMessage("Title", errorMessages.LENGTH_ERROR(CATEGORY_TITLE_MIN_LENGTH, CATEGORY_TITLE_MAX_LENGTH))
        .custom(value => {}) // TODO: implement unique title checking
        .withMessage("Title", errorMessages.UNIQUE_ERROR),
    body("categoryDescription")
        .trim()
        .notEmpty()
        .withMessage("Description", errorMessages.EMPTY_ERROR)
        .isAlphanumeric()
        .withMessage("Description", errorMessages.ALPHANUMERIC_ERROR)
        .isLength({ min: CATEGORY_DESCRIPTION_MIN_LENGTH, max: CATEGORY_DESCRIPTION_MAX_LENGTH})
        .withMessage("Description", errorMessages.LENGTH_ERROR(CATEGORY_DESCRIPTION_MIN_LENGTH, CATEGORY_DESCRIPTION_MAX_LENGTH)),
];

module.exports = {
    validateCreateCategory,
    CATEGORY_TITLE_MIN_LENGTH,
    CATEGORY_TITLE_MAX_LENGTH,
    CATEGORY_DESCRIPTION_MIN_LENGTH,
    CATEGORY_DESCRIPTION_MAX_LENGTH,
};