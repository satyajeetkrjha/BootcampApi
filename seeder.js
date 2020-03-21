const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');

require('dotenv').config();

//We load the model
const Bootcamp = require('./models/Bootcamp');

//Now connect to Database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


//We will read json file ,parse it and dump it in database
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

//Dumping into database
const importData = async () => {
    try {
        //Dumped
        await Bootcamp.create(bootcamps);
        console.log('Data dumped into database'.green);
        process.exit();// kill te server
    } catch (err) {
        console.log("err is ", err)
    }
};
//Deleting from database
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log("data deleted");
        process.exit();
    } catch (err) {
        console.log("err in deleting data", err);
    }
};


if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}

