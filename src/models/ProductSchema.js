'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    slug: { //Cadeira Gamer = cadeira-gamer (isso é o slug) e tem que ser unico
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Descrição é obrigatória, anjo'],
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        require: true
    }]
});

module.exports = mongoose.model('Product', schema);