const mongoose = require('mongoose');
console.log(require('dotenv').config());
const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`Mongodb connected ${conn.connection.host}`.blue)
};
module.exports=connectDB;