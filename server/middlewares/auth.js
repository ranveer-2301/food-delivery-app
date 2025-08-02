const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // console.log("req cookies", req.cookies);
    // console.log("req headers", req.headers);
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    console.log("token in auth middleware ppp", token);
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token Missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id, email: decoded.email };
        next();
    } catch (err) {
        const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid Token';
        res.status(403).json({ success: false, message });
    }
};

module.exports = authMiddleware;