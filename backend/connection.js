const { default: mongoose } = require("mongoose")

const DBconnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/agregation")
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Lose");
    }
}

module.exports = DBconnect