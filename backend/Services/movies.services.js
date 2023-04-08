
const { } = require('../shared/mongo');

module.exports = {
    async getMovies(req, res) {
        try {
            let data = await this.movies.find().toArray();
            res.json(data);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "error fetching movies list" })
        }
    },
    async loadMovies(req, res) {
        try {
            await this.movies.insertOne({ ...req.body, createdOn: new Date().toLocaleString(), modifiedOn: new Date().toLocaleString() })
            res.json({ message: 'details updated' })
        }
        catch (error) {
            console.log(error);
        }
    }
}