const validateProduct = (req, res, next) => {
    const { name, price, quantity } = req.body;
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }

    if (price === undefined || price === null || isNaN(price) || Number(price) < 0) {
        errors.push('Price must be a valid non-negative number');
    }

    if (quantity === undefined || quantity === null || isNaN(quantity) || Number(quantity) < 0) {
        errors.push('Quantity must be a valid non-negative integer');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateProduct };
