'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/FluentValidator');

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

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
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
    Product
        .find({
            tags: req.params.tag,
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
    let contract = new ValidationContract();
    contract.hasMinLeh(req.body.title, 3, 'O título deve ter pelo menos 3 caracteres, bb');
    contract.hasMinLeh(req.body.slug, 3, 'O slug deve ter pelo menos 3 caracteres, bb');
    contract.hasMinLeh(req.body.description, 3, 'A description deve ter pelo menos 3 caracteres, bb');

    //Se os dados forem inválidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return;
    }


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
    Product
        .findByIdAndUpdate(req.params.id, {
            //set vai atualizar apenas o que eu passar aqui, se eu não passar valor, vai atualizar pra null, os que não estiverem aqui, permanecem inalterados
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        })
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
    Product
        .findOneAndRemove(req.body.id)
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