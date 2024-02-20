const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
mongoose.connect("mongodb://127.0.0.1:27017/contactDance");
const port = 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})
var contact = mongoose.model("contact",contactSchema)

app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the data base")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    
})
app.listen(port, () => {
    console.log(`The application started succesfully on port ${port}`);
});