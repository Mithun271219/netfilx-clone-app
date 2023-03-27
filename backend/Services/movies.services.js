

module.exports = {
    async getMovies(req, res) {
        try {

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "error fetching movies list" })
        }
    }
}