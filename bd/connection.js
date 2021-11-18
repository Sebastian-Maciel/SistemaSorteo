const mongoose = require("mongoose");
const user = 'admin';
const password = 'admin';
const dbName = 'sorteos';
const uri = `mongodb+srv://${user}:${password}@cluster0.3nuhn.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(uri)
    .then(() => console.log('Connection successful'))
    .catch((err) => console.log(err));

module.exports = mongoose;