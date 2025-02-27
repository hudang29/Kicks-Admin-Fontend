export function validateForm(onlyText, name, number) {
    let tempErrors = {};
    let isValid = true;

    const containsLetterRegex = /[a-zA-Z]/; // Kiểm tra có ít nhất một chữ cái không
    const onlyLettersRegex = /^[a-zA-Z\s]+$/;

    if (!name) {
        tempErrors.name = "text is required";
        isValid = false;
    } else if (!containsLetterRegex.test(name)) {
        tempErrors.name = "text must contain at least one letter";
        isValid = false;
    }

    if (!onlyText) {
        tempErrors.onlyText = "text is required";
        isValid = false;
    } else if (!onlyLettersRegex.test(name)) {
        tempErrors.onlyText = "text must only letters";
        isValid = false;
    }

    if (!number || number <= 0) {
        tempErrors.number = "Please enter a valid price";
        isValid = false;
    }

    return {isValid, errors: tempErrors};
}
