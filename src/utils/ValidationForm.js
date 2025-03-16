export const validatePassword = (newPassword) => {
    if (newPassword.length < 8) return "Password must be at least 8 characters long!";
    if (!/\d/.test(newPassword)) return "Password must contain at least one number!";
    if (!/[A-Z]/.test(newPassword)) return "Password must contain at least one uppercase letter!";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) return "Password must contain at least one special character!";
    return "";
};
