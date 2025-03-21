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
        const cep = req.body.queryResult.parameters.cep;

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            // Correção: Verifica se a propriedade 'erro' existe e é verdadeira
            if (response.data && response.data.erro) {
                return res.json({ fulfillmentText: "O CEP informado não foi encontrado. Verifique e tente novamente." });
            }

            const endereco = response.data;
            const mensagem = `Aqui está o endereço para o CEP ${cep}: ${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}.`;

            return res.json({ fulfillmentText: mensagem });
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error.message);
            return res.json({ fulfillmentText: "Houve um erro ao buscar o CEP. Tente novamente mais tarde."+endereco.logradouro });
        }
    }

    return res.json({ fulfillmentText: "Desculpe, não entendi sua solicitação." });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
