function focusErrors () {
    const firstInvalidField = document.querySelector(".invalid-form-input");
    
    if (firstInvalidField) {
        firstInvalidField.focus();
        firstInvalidField.setSelectionRange(firstInvalidField.value.length, firstInvalidField.value.length);
    } 
};