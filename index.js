//index.js

import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

var db = null 

const app = express();
//app.use(cors);

// Configuring body parser middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());


app.get('/',(req,res) => {
	res.send('GeeksforGeeks');
})

app.get('/books', (req, res) => {
    var books = [
        {a:1}
    ]
    res.json(books);
});

app.get('/albums', (req, res) => {
    (async () => {
        var rows = await db.all("select l.Title, r.Name from albums l inner join artists r on r.ArtistId = l.ArtistId")
        res.json(rows)
        console.log('get /albums')
    })()
});

app.get('/employees', (req, res) => {
    (async () => {
        var rows = await db.all("select * from employees")
        res.json(rows)
        console.log('get /employees')
    })()
});

const PORT = 5001;

app.listen(PORT,() => {
	console.log(`Running on PORT ${PORT}`);
    (async () => {
        db = await open({
          filename: './chinook.db',
          driver: sqlite3.Database
        })
    })()
})
