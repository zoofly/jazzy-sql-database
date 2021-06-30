const express = require('express');
const bodyParser = require('body-parser');
const pg= require('pg');


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
app.get('/' (req,res) =>{
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



// const artistList = [ 
//     {
//         name: 'Ella Fitzgerald',
//         birthdate: '04-25-1917'
//     },
//     {
//         name: 'Dave Brubeck',
//         birthdate: '12-06-1920'
//     },       
//     {
//         name: 'Miles Davis',
//         birthdate: '05-26-1926'
//     },
//     {
//         name: 'Esperanza Spalding',
//         birthdate: '10-18-1984'
//     },
// ]
const songList = [
    {
        title: 'Take Five',
        length: '5:24',
        released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        released: '1959-08-17'
    },
    {
        title: 'Black Gold',
        length: '5:17',
        released: '2012-02-01'
    }
];


app.get('/artist', (req, res) => {
    console.log(`In /songs GET`);
    res.send(artistList);
});

app.post('/artist', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

app.get('/song', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});


