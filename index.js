const express = require('express')
const Cloudant = require('@cloudant/cloudant')
const bodyParser = require('body-parser')

const port = process.env.PORT | 8000;

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var curl = "https://apikey-v2-fzp5n2e7ql9z9xi5fb45107d529kceaejwxcab1quzw:cac128113c2309fbc6a82a663f9b20e3@a5c01d67-b062-44eb-8e15-7b362a56df6d-bluemix.cloudantnosqldb.appdomain.cloud";
var cusername = "apikey-v2-fzp5n2e7ql9z9xi5fb45107d529kceaejwxcab1quzw";
var cpassword = "cac128113c2309fbc6a82a663f9b20e3";

const cloudant = Cloudant({
    username: cusername,
    password: cpassword,
    url: curl
});

const databaseName = 'taskp10';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-form', (req, res) => {
    const userData = {
        id :  req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
        pincode: req.body.pincode
    };

    // const db = cloudant.db.use(databaseName);
    cloudant.db.use(databaseName).insert(userData, (err, body) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.send('Error submitting data');
        } else {
            console.log('Data inserted successfully:', body);
            res.send('Data submitted successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


 