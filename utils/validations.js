const isEmpty = (value) => {
    return (typeof value === "undefined" || value === null);
}

module.exports = {
    isEmpty,
}