const isAuthenticated = (req, res, next) => {
    if (!req.cookies.userId) {
        return res.status(401).json({ msg: 'You need to log in to access this page' });
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (req.cookies.role !== 'admin') {
        return res.status(403).json({ msg: 'You are not authorized to access this page' });
    }
    next();
};

module.exports = {
    isAuthenticated,
    isAdmin
};
