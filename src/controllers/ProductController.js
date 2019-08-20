'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/ProductRepository');

//usando exports
exports.get = async (req, res, next) => {
    //novo
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Deu falha meu compatriota, olha aqui: ' + error
        })
    }

    //Antigo
    // repository
    //     .get()
    //     .then((p) => {
    //         res.status(200).send({
    //             message: 'Seus produtos meu querido',
    //             products: p
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(400).send({
    //             message: 'Deu ruim, meu compatriota',
    //             data: error
    //         })
    //     })
}

exports.getBySlug = async(req, res, next) => {
    //Novo
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);

    } catch(error) {
        res.status(500).send({
            message: 'Deu erro, meu compatriota, dá uma olhada: ' + error
        })
    }
    
    //Antigo
    // repository
    //     .getBySlug(req.params.slug)
    //     .then((p) => {
    //         res.status(200).send({
    //             message: 'Seus produtos meu querido',
    //             products: p
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(400).send({
    //             message: 'Deu ruim, meu compatriota',
    //             data: error
    //         })
    //     })
}

exports.getById = async (req, res, next) => {
    //Novo
    try {
        let data = await repository.getById(req.params.id)
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({
            message: 'Deu erro, meu compatriota, olha aqui: ' + error
        })
    }
    
    //Antigo
    // repository
    //     .getById(req.params.id)
    //     .then((p) => {
    //         res.status(200).send({
    //             message: 'Seus produtos meu querido',
    //             products: p
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(400).send({
    //             message: 'Deu ruim, meu compatriota',
    //             data: error
    //         })
    //     })
}

exports.getByTag = async(req, res, next) => {
    //Novo
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({
            message: 'Deu ruim meu compatriota, dá uma olhada aí: ' + error
        })
    }
    
    //Antigo
    // repository
    //     .getByTag(req.params.tag)
    //     .then((p) => {
    //         res.status(200).send({
    //             message: 'Seus produtos meu querido',
    //             products: p
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(400).send({
    //             message: 'Deu ruim, meu compatriota',
    //             data: error
    //         })
    //     })
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLeh(req.body.title, 3, 'O título deve ter pelo menos 3 caracteres, bb');
    contract.hasMinLeh(req.body.slug, 3, 'O slug deve ter pelo menos 3 caracteres, bb');
    contract.hasMinLeh(req.body.description, 3, 'A description deve ter pelo menos 3 caracteres, bb');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return;
    }

    try {
        let data = await repository.create(req.body);
        res.status(201).send({
            data,
            message: 'Produto cadastrado, bb'
        });
    } catch(error) {
        res.status(500).send({
            message: 'Deu ruim meu compatriota, dá uma olhada: ' + error
        })
    }

    //Antigo
    // repository
    //     .create(req.body)
    //     .then((p) => {
    //         res.status(201).send({
    //             message: 'Produto cadastrado com sucesso, bb'
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(400).send({
    //             message: 'Deu erro, bb',
    //             data: error
    //         })
    //     })
}

exports.put = async (req, res, next) => {
    try {
        let data = await repository.update(req.params.id, req.body);
        res.status(200).send({
            data,
            message: 'Produto atualizado, meu anjo'
        })
    } catch(error) {
        res.status(500).send({
            message: 'Deu erro, meu compatriota, olha ai: ' + error
        })
    }
    
    
    //Antigo
    // repository
    //     .update(req.params.id, req.body)
    //     .then((p) => {
    //         res.status(200).send({
    //             message: 'Produto cadastrado com sucesso, bb'
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(400).send({
    //             message: 'Deu erro, bb',
    //             data: error
    //         })
    //     })
}

exports.delete = async (req, res, next) => {
    try {
        let data = await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Deletado com sucesso, bb'
        })
    } catch(error) {
        res.status(500).send({
            message: 'Deu ruim, meu compatriota, dá uma olhada aí: ' + error
        })
    }
    
    
    
    //Antigo
    // repository
    //     .delete(req.body.id)
    //     .then((p) => {
    //         res.status(200).send({
    //             message: 'Produto removido com sucesso, bb'
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(400).send({
    //             message: 'Deu erro, bb',
    //             data: error
    //         })
    //     })
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