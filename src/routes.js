const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const getRouter = require('./controller/getHandler');
const getByIdRouter = require('./controller/getByIdHandler');
const addRouter = require('./controller/createHandler');
const updateRouter = require('./controller/updateHandler');
const deleteRouter = require('./controller/deleteHandler');
const deleteByIdRouter = require('./controller/deleteByIdHandler');

const {json, urlencoded} = express;

const app = express();

const jsonParser = bodyParser.json();


app.use(bodyParser.urlencoded({extended: true}));

app.route('/health').get((req, res) => res.json({ status: 'UP'}))
app.route('/version').get((req, res) => res.json({ version: '1.0.0'}))
app.route('/').get((req, res) => {
    res.send("Welcome to the project of a CRUD with nodejs");
})

app.route('/records').get(getRouter);
app.route('/record/:id').get(getByIdRouter);
app.route('/add-album').post(jsonParser, addRouter);
app.route('/update-album').put(jsonParser, updateRouter);
app.route('/delete-album').delete(jsonParser, deleteRouter);
app.route('/delete/:id').delete(jsonParser, deleteByIdRouter);

module.exports = app;