export const validatePassword = (newPassword) => {
    if (newPassword.length < 8) return "Password must be at least 8 characters long!";
    if (!/\d/.test(newPassword)) return "Password must contain at least one number!";
    if (!/[A-Z]/.test(newPassword)) return "Password must contain at least one uppercase letter!";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) return "Password must contain at least one special character!";
    return "";
};

export const validateNumber = (number) => {
    if(Number(number) === 0) return "Cannot enter 0 first";
    if(/^(0|[1-9][0-9]*)$/.test(number)){
        return "";
    } else {
        return "Invalid number";
    }
};

// export const getPublicIdFromUrl = (url) => {
//     const regex = /\/upload\/v\d+\/(.+)\.\w+$/; // Tìm phần sau "/upload/v{timestamp}/"
//     const match = url.match(regex);
//     return match ? match[1] : null;
// };

