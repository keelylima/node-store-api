'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
//const router = express.Router();
//const controller = require('./controllers/ProductController')

//Conecta ao banco
const MONGO_URL = "mongodb://localhost:27017/node-store";
mongoose.connect(MONGO_URL);

//Carrega os models
const Product = require('./models/ProductSchema');
const Customer = require('./models/CustomerSchema');
const Order = require('./models/OrderSchema');


//Carrega as Rotas
const index = require('./routes/index');
const product = require('./routes/product');
const customer = require('./routes/customer');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/products', product);
app.use('/customers', customer);


module.exports = app;