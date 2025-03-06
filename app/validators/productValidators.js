const { body } = require("express-validator");
const errorMessages = require("./errorMessages.js");

const CATEGORY_TITLE_MIN_LENGTH = 1;
const CATEGORY_TITLE_MAX_LENGTH = 256;
const CATEGORY_DESCRIPTION_MIN_LENGTH = 1;
const CATEGORY_DESCRIPTION_MAX_LENGTH = 1024;
const CORRECT_PASSWORD = "test";

const validateCreateCategory = [
    
]