// Declaring variables
// setting up server.js
const express = require("express");
const app = express();

//configuring the server.js file to access the credentials in the .env
// importing dependencies
const mysql = require('mysql2');
const dotenv = require('dotenv');

//configuring
dotenv.config();

//creating a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//test connection
db.connect((err) => {
    //if connection is not successful
    if (err){
        return console.log("Error connecting to the database: ", err)
    }

    //connection successful
    console.log("Successfully connected to MySQL: ", db.threadId)

    
})


// question 1
//retrieve patients data(patient id, first name, last name and date of birth)
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        //if there is an error
        if (err) {
            return res.status(400).send("Failed to get patients data", err)
        }

        res.status(200).send(data)
    }); 
});


//question 2
//retrieve providers data (first name, last name and provider specialty)
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        //if there is an error
        if (err) {
            return res.status(400).send("Failed to get providers data", err)
        }

        res.status(200).send(data)
    }); 
});


//question 3
//retrieve patients name
app.get('/patientsName', (req, res) => {
    let getName = 'SELECT first_name FROM patients';
    const queryParams = []; 
    db.query(getName, queryParams, (err, data) => {
        //if there is an error
        if (err) {
            return res.status(400).send("Failed to get patients first name" , err)
        }

        res.status(200).send(data)
    }); 
});



//question 4
//retrieve providers specialty
app.get('/providerSpecialty', (req, res) => {
    let getSpecialty = 'SELECT provider_specialty FROM providers';
    const queryParams = []; 
    db.query(getSpecialty, queryParams, (err, data) => {
        //if there is an error
        if (err) {
            return res.status(400).send("Failed to get providers specialty" , err)
        }

        res.status(200).send(data)
    }); 
});



//listen to the server
// declaring PORT 
const PORT = 3300
app. listen (PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
});