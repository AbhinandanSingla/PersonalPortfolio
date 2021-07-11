const mongoose = require('mongoose');
const uri = "mongodb+srv://personalportfolio:Deepu@3461@cluster0.pazkz.mongodb.net/PersonalPortfolio777?retryWrites=true&w=majority";
const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017/PersonalPortfolio'
const connectDB = async () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log('connection is successful');
    }).catch((e) => {
        console.log(`there is a problem in connection ERROR : ${e}`)
    });
}

module.exports = connectDB