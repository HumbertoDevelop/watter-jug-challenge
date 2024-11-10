export const numberTypeValidation = (value) => {
    if (typeof value !== 'number' || !Number.isInteger(value) && value <= 0) {
        return false;
    }
    return true;
};