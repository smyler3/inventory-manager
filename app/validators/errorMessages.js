const EMPTY_ERROR = "can not be empty";
const ALPHA_ERROR = "must only contain alphabet letters";
const ALPHANUMERIC_ERROR = "must only contain alphabet letters, numbers, and punctuation";
const UNIQUE_ERROR = "already in use";
const LENGTH_ERROR = (min_length, max_length) => {
    return `Description must be within ${min_length} and ${max_length} characters long`;
};


module.exports = {
    EMPTY_ERROR,
    ALPHA_ERROR,
    ALPHANUMERIC_ERROR,
    UNIQUE_ERROR,
    LENGTH_ERROR,
};