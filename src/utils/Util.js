export const getStatusClass = (status) => {
    switch (status) {
        case "PENDING":
            return "warning";
        case "CONFIRMED":
            return "primary";
        case "PROCESSING":
            return "secondary";
        case "DELIVERING":
            return "dark";
        case "COMPLETED":
            return "success";
        case "CANCELLED":
            return "danger";
        default:
            return "btn-secondary";
    }
};

export const stopLoadingWithDelay = (setLoading, delay = 400) => {
    setTimeout(() => {
        setLoading(false);
    }, delay);
};