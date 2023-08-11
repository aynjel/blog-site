const mongoose = require('mongoose');
const debug = require('debug')('blog-site:database');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        debug('Database connected');
    } catch (error) {
        console.error(error);
        debug('Error connecting to database');
    }
}

module.exports = connect;