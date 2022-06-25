const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

// const mongoURI = "mongodb+srv://vikas:vikas@cluster0.f7lnn.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;