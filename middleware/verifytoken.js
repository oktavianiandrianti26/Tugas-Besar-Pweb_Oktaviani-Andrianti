const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || '';
    if (!token) {
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
        res.statu4s(401).json({ message: 'Invalid token' });
    }
};

module.exports={
    verifyToken
}