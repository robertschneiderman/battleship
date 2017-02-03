const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');

const router = require('./router');
const mongoose = require('./db/mongoose');

const app = express();


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

app.use(express.static(path.join(__dirname, '../')));

const indexPath = path.join(__dirname, '/../index.html');

app.get('/', function(req, res) {
    res.sendFile(indexPath);
});

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);