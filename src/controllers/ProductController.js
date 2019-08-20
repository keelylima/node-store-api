'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/ProductRepository');

//usando exports
exports.get = (req, res, next) => {
    repository
        .get()
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
    repository
        .getBySlug(req.params.slug)
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

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
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

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
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
    let contract = new ValidationContract();
    contract.hasMinLeh(req.body.title, 3, 'O título deve ter pelo menos 3 caracteres, bb');
    contract.hasMinLeh(req.body.slug, 3, 'O slug deve ter pelo menos 3 caracteres, bb');
    contract.hasMinLeh(req.body.description, 3, 'A description deve ter pelo menos 3 caracteres, bb');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return;
    }


    repository
        .create(req.body)
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
    repository
        .update(req.params.id, req.body)
        .then((p) => {
            res.status(200).send({
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

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.id)
        .then((p) => {
            res.status(200).send({
                message: 'Produto removido com sucesso, bb'
            })
        })
        .catch((error) => {
            res.status(400).send({
                message: 'Deu erro, bb',
                data: error
            })
        })
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