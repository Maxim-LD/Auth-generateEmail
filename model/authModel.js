
const mongoose = require("mongoose")


const authSchema = new mongoose.Schema({

    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email:{type: String, require: true},
    course:{type: String, require: true},
    password: {type: String, require: true}


}, {
    timestamps: true

})

const Clients = new mongoose.model("clients", authSchema)

module.exports = Clients