

module.exports = {
    async logging(req, res, next) {
        console.log(new Date().toLocaleString(), req.url, req.method)
        next();
    }
}