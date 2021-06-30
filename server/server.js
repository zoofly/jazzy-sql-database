const express = require('express');
const bodyParser = require('body-parser');
const pg= require('pg');
const { query } = require('express');


const app = express();
const PORT = 5000;
const Pool= pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
})


//for debugging purposes
pool.on('connect', () =>{
    console.log('Postgresql connected.');
});

pool.on('error', ()=>{
    console.log('Error in trying to connect to Postgresql.');
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});



// TODO - Replace static content with a database tables

//get request
//returns artistList(array) objects from postgres to server
app.get('/artist', (req,res) => {
    //Create a variable to hold the SQL query
    let queryText= 'SELECT * FROM "artist";';
    //making request to database to grab data
    pool.query(queryText)
        .then(result =>{
        res.send(result.rows);
        }).catch(error =>{
            console.log('Error in getting artist from postgres', error);
            res.sendStatus(500);
        })
})


app.post('/artist', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

app.get('/song', (req,res) => {
    //Create a variable to hold the SQL query
    let queryText= 'SELECT * FROM "song";';
    //making request to database to grab data
    pool.query(queryText)
        .then(result =>{
            console.log("Request completed", result);
        res.send(result.rows);
        }).catch(error =>{
            console.log('Error in getting artist from postgres', error);
            res.sendStatus(500);
        })
})

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});


