require("dotenv").config()
const mongoose = require("mongoose");

const mongoURI = process.env.MONGOURI;

const initializeDatabase = async ()=>{
    try {
        const connection = await mongoose.connect(mongoURI);
        if(connection){
            console.log("Connection Successful")
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = initializeDatabase;
