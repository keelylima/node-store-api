'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//usando exports
exports.get = (req, res, next) => {
    Product
        .find({ //sem nada dentro, ele vai trazer todos
            active: true //pra trazer apenas produtos "ativos" no sistema
        }, 'title price slug') //segundo parametro é tudo o que eu quero trazer
        .then((p) => {
            res.status(200).send({
                message: 'Seus produtos meu querido',
                products: p
            })
        })
        .catch((error) => {
            res.status(400).send({
                message: 'Deu ruim, meu compatriota',
                data: error
            })
        })
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({ //não retorna uma array (?)
            slug: req.params.slug, //vai buscar de acordo com slug que eu passar
            active: true
        }, 'title description price slug tags')
        .then((p) => {
            res.status(200).send({
                message: 'Seus produtos meu querido',
                products: p
            })
        })
        .catch((error) => {
            res.status(400).send({
                message: 'Deu ruim, meu compatriota',
                data: error
            })
        })
}


exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product
        .save()
        .then((p) => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso, bb'
            })
        })
        .catch((error) => {
            res.status(400).send({
                message: 'Deu erro, bb',
                data: error
            })
        })
}

exports.put = (req, res, next) => {
    const id = req.params.id;
   res.status(200).send({
       id: id,
       item: req.body
   })
}

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
}



//usando module.exports
// const metodoPost = (req, res, next) => {
//     res.status(201).send(req.body);
// }

// const metodoPut = (req, res, next) => {
//    const id = req.params.id;
//    res.status(200).send({
//        id: id,
//        item: req.body
//    })
// }

// const metodoDelete = (req, res, next) => {
//     res.status(200).send(req.body);
// }

// module.exports = {
//    metodoPost,
//    metodoPut,
//    metodoDelete
// }