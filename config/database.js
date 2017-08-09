var mongoose =require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/adopted')
var db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to Mongodb at ${db.host}:${db.port}`)
});

db.once('error', (err) => {
    console.log(`database error:\n${err}` )
});