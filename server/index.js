/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const cors = require('cors');

const mysql = require('mysql2');
const helmet = require("helmet");
const express = require('express');
const database = require('./database');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const queryConfig = require('./scripts/queryConfig');

const { userLogin } = require('./api/user_login');
const { queryConfigItem } = require('./api/queryConf');
const { verifyToken } = require('./scripts/verifyToken');
const { checkConnection } = require('./scripts/connection');
const { userInfos, editInfos } = require('./api/user_infos');
const { linkQuery, linkDelete, linkAppend } = require('./api/linkManner');
const { musicQuery, musicDelete, musicAppend } = require('./api/musicManner');
const { StyleConfigChange, CommeConfigChange, ActivConfigChange, HomeConfigChange, InsertCodeChange } = require('./api/changConf');

const port = 3000;
const app = express();
const connection = mysql.createConnection(database);

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,max: 120
});

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(error => {
    if (error) throw error;
    console.log("\nSuccessfully connected to the database.");
});

app.get('/api/links/query', (req, res) => {
    linkQuery(connection, res);
});

app.get('/api/music/query', (req, res) => {
    musicQuery(connection, res);
});

app.post('/api/admin/login', (req, res) => {
    userLogin(connection, req, res);
});

app.post('/api/token/connection', (req, res) => {
    checkConnection(req,res);
});

app.post('/api/admin/infos', verifyToken, (req, res) => {
    userInfos(connection, req, res);
});

app.post('/api/admin/infos/edit', verifyToken, (req, res) => {
    editInfos(connection, req, res);
});

app.post('/api/links/append', verifyToken, (req, res) => {
    linkAppend(connection, req, res);
});

app.post('/api/links/delete', verifyToken, (req, res) => {
    linkDelete(connection, req, res);
});

app.post('/api/music/append', verifyToken, (req, res) => {
    musicAppend(connection, req, res);
});

app.post('/api/music/delete', verifyToken, (req, res) => {
    musicDelete(connection, req, res);
});

for (const iterator of queryConfig) {
    app.post(`/api/config/${iterator}`, verifyToken, (req, res) => {
        queryConfigItem(connection, req, res);
    });
}

app.post('/api/config/home/change', verifyToken, (req, res) => {
    HomeConfigChange(connection, req, res);
});

app.post('/api/config/style/change', verifyToken, (req, res) => {
    StyleConfigChange(connection, req, res);
});

app.post('/api/config/comment/change', verifyToken, (req, res) => {
    CommeConfigChange(connection, req, res);
});

app.post('/api/config/actives/change', verifyToken, (req, res) => {
    ActivConfigChange(connection, req, res);
});

app.post('/api/config/insertcode/change', verifyToken, (req, res) => {
    InsertCodeChange(connection, req, res);
});

app.listen(port, () => {
    console.log(`\nServer running on port ${port}`);
});
