const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected to DB")
        }
        )
        .catch((err) => {
            console.error(`failed to conect: ${err}`);
        })

}

module.exports = connectDB