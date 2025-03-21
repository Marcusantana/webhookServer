const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    console.log('Requisição recebida: ', req.body);

    const intent = req.body.queryResult.intent.displayName;

    if (intent === 'Buscar CEP') {
        let cep = req.body.queryResult.parameters['zip-code']; // Correção: Busca pelo parâmetro 'zip-code'

        console.log("cep recebido: ", cep);

        if (!cep) {
            return res.json({ fulfillmentText: "Por favor, informe o CEP." });
        }

        cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos

        console.log("cep limpo: ", cep);
        console.log("tamanho do cep: ", cep.length);

        if (cep.length !== 8) {
            return res.json({ fulfillmentText: "O CEP deve ter 8 dígitos." });
        }

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (response.data && response.data.erro) {
                return res.json({ fulfillmentText: "O CEP informado não foi encontrado. Verifique e tente novamente." });
            }

            const endereco = response.data;
            const mensagem = `Aqui está o endereço para o CEP ${cep}: ${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}.`;

            return res.json({ fulfillmentText: mensagem });
        } catch (error) {
            if (error.response) {
                console.error('Erro na resposta da API:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('Nenhuma resposta da API:', error.request);
            } else {
                console.error('Erro na configuração da requisição:', error.message);
            }
            return res.json({ fulfillmentText: "Houve um erro ao buscar o CEP. Tente novamente mais tarde." });
        }
    }

    return res.json({ fulfillmentText: "Desculpe, não entendi sua solicitação." });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
