const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.DB_URL).then((conn) => {
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }).catch((err) => {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    });
}

module.exports = connectDB;