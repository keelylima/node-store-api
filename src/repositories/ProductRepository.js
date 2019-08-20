'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({ //sem nada dentro, ele vai trazer todos
            active: true //pra trazer apenas produtos "ativos" no sistema
        }, 'title price slug') //segundo parametro é tudo o que eu quero trazer
}

exports.getBySlug = (slug) => {
    return Product
        .findOne({ //não retorna uma array (?)
            //antigo
            //req.params.slug, //vai buscar de acordo com slug que eu passar

            //novo
            slug: slug,
            active: true
        }, 'title description price slug tags')
}

exports.getById = (id) => {
    return Product
        .findById(id)
}

exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
}

//data é o req.body
exports.create = (data) => {
    let product = new Product(data);
    return product.save();
}

exports.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            //set vai atualizar apenas o que eu passar aqui, se eu não passar valor, vai atualizar pra null, os que não estiverem aqui, permanecem inalterados
            $set: {
                title: data.title,
                description: data.description,
                price: data.price
            }

            //antigo
            //title: req.body.title,
           //description: req.body.description,
            //price: req.body.price
        })
}

exports.delete = (id) => {
    return Product
        .findOneAndRemove(id);
}