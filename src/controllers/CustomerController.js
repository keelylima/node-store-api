'use strict'

const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/CustomerRepository')

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLeh(req.body.name, 3, 'O nome deve ter pelo menos 3 caracteres, bb');
    contract.isEmail(req.body.email, 'Email Inválido');
    contract.hasMinLeh(req.body.password, 6, 'A senha deve ter pelo menos 6 caracteres, bb');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return;
    }

    try {
        let data = await repository.create(req.body);
        res.status(201).send({
            data,
            message: 'Cliente cadastrado, bb'
        });
    } catch(error) {
        res.status(500).send({
            message: 'Deu ruim meu compatriota, dá uma olhada: ' + error
        })
    }
}