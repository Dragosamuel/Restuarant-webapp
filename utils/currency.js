// Currency formatting utility
const formatUgandanPrice = (price) => {
    return `Ugx ${price.toLocaleString()}`;
};

module.exports = formatUgandanPrice;