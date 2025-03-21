'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const requestPromise = require('request-promise'),
    syncRequest = require('sync-request');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const CEP_SIZE = 8,
    VIACEP_URI = 'https://viacep.com.br'; // Use uma URI fixa para o exemplo

const callViaCep = (cep, options) => {
    let requestOptions = {
        json: true,
        uri: `${VIACEP_URI}/ws/${cep}/json`,
        timeout: options ? options.timeout : 5000
    };
    return requestPromise(requestOptions);
}

const invalidCep = cep => {
    return !cep || !isStringOrNumber(cep) || cep.toString().length !== CEP_SIZE;
}

const isStringOrNumber = value => {
    return typeof value === 'string' || value instanceof String || !isNaN(value);
}

const getValidationMessage = () => {
    return `The CEP should be a number or string of size ${CEP_SIZE}. Please check your parameter.`;
}

const getDataSync = (cep) => {
    let ret;
    try {
        if (invalidCep(cep)) {
            throw new Error(getValidationMessage());
        }
        ret = syncRequest('GET', `${VIACEP_URI}/ws/${cep}/json`);
        ret = JSON.parse(ret.getBody());
    } catch (e) {
        ret = {
            hasError: true,
            statusCode: e.statusCode,
            message: e.message
        };
    }

    return ret;
}

const getDataAsync = (cep, options) => {
    return new Promise((resolve, reject) => {
        if (invalidCep(cep)) {
            reject({ message: getValidationMessage() });
        } else {
            callViaCep(cep, options)
                .then(placeInfo => {
                    resolve(placeInfo);
                })
                .catch(err => {
                    reject({ statusCode: err.statusCode, message: err.error });
                });
        }
    });
}

function getDetailsByZipCode(cep, options) {
    if (!_.isEmpty(cep) && isNaN(cep)) {
        cep = cep.replace(/[-\s]/g, '');
    }
    return (options === true || (options && options.sync)) ?
        getDataSync(cep) :
        getDataAsync(cep, options);
}

app.post('/webhook', async (req, res) => {
    const cep = req.body.queryResult.parameters.cep; // Pega o CEP do Dialogflow
    const options = {}; // Pode adicionar opções aqui, se necessário

    try {
        const result = await getDetailsByZipCode(cep, options);

        if (result.erro) {
            return res.json({ fulfillmentText: "CEP não encontrado." });
        }

        const mensagem = `Aqui está o endereço para o CEP ${cep}: ${result.logradouro}, ${result.bairro}, ${result.localidade} - ${result.uf}.`;
        return res.json({ fulfillmentText: mensagem });
    } catch (error) {
        console.error('Erro ao buscar o CEP:', error.message);
        return res.json({ fulfillmentText: "Houve um erro ao buscar o CEP." });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});