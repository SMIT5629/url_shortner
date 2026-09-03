const mongoose = require("mongoose")

const connectDB = async (params) => {
    await mongoose.connect(process.env.MONGO_URI)
}

module.exports = { connectDB }