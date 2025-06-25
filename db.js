const mongoose = require('mongoose')
const URI = 'mongodb+srv://hockeyblogsite:OEvqoOkNlITM4FY4@hockeyblog.90swgqu.mongodb.net'

mongoose.set("strictQuery", false);
const connectToMongo = () => mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully")
})

module.exports = connectToMongo