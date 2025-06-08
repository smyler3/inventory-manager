const EMPTY_ERROR = "can not be empty";
const ALPHA_ERROR = "must only contain letters";
const ALPHANUMERIC_ERROR = "must only contain letters, numbers, and punctuation";
const UNIQUE_ERROR = "already in use";
const PASSWORD_ERROR = "is incorrect";
const LENGTH_ERROR = (min_length, max_length) => {
    return `must be within ${min_length} and ${max_length} characters long`;
};
const BOUND_ERROR = (min_bound, max_bound) => {
    return `must have a value between ${min_bound} and ${max_bound}`;
};


module.exports = {
    EMPTY_ERROR,
    ALPHA_ERROR,
    ALPHANUMERIC_ERROR,
    UNIQUE_ERROR,
    PASSWORD_ERROR,
    LENGTH_ERROR,
    BOUND_ERROR,
};