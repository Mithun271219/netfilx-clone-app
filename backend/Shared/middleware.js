const jwt = require('jsonwebtoken');

module.exports = {
    async logging(req, res, next) {
        console.log(new Date().toLocaleString(), req.url, req.method)
        next();
    },

    async jwtValidation(req, res, next) {
        try {
            if (req.headers && req.headers.authorization) {
                const [tokenType, token] = req.headers.authorization.split(' ');
                if (tokenType === 'Bearer' && token) {
                    try {
                        req.user = await jwt.verify(token, process.env.jwtkey);
                        next();
                    } catch (error) {
                        console.log(error)
                        res.status(401).json({ message: "user is not authorized 1" });
                    }
                } else {
                    res.status(401).json({ message: "user is not authorized 2" });
                }
            } else {
                res.status(401).json({ message: "user is not authorized 1" });
            }
        } catch (error) {
            console.log(error)
        }
    }
}