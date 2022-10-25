const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');

function logRequest({ method, url }, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(logRequest);

app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app;