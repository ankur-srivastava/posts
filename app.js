const express = require('express')
const mongoose = require('mongoose');
const { User } = require('./src/schemas/user');
require('dotenv').config();

const app = express();

const dbUrl = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.gavbp.mongodb.net/padakoo?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DB Connected');
}).catch((error)=>{
    console.error('DB Connection Error ', error);
});

function testData() {
    // Lets add a user
    const newuser = new User({email: 'a@a.com', created: new Date()});
    try{
        console.log('Save user')
        newuser.save();
        console.log('User Saved')
    } catch(error) {
        console.error(error);
    }
}

app.get('/', (req, res) => {
    // testData();
    res.sendStatus(200);
});

app.listen(8000, (req, res) => {
    console.log('Server Started')
});
