
const mongoose = require("mongoose")

const connectToDB = async ()=>{

    mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("Connected to Database")
    })
}


module.exports = connectToDB