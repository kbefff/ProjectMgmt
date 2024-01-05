require('dotenv').config() // FIXME: dotenv was not working, throwing error in ui. let's see if this fixes it
const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB