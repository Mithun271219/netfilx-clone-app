module.exports = {
    async URLnotvalid(req, res) {
        try {
            await res.status(404).json({ message: "invalid URL" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "error while accessing the URL" })
        }
    }
}