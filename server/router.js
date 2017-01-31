const express = require('express');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.send('SUCESS!');
    });
    
};