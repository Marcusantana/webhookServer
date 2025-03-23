const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const contexto = {
    valorInstrumento: 0,
    nomeInstrumento: null,
    cep: 0,
    frete: 0
};

app.post('/webhook', async (req, res) => {
    console.log('Requisição recebida: ', req.body);

    const intent = req.body.queryResult.intent.displayName;
    const userQuery = req.body.queryResult.queryText.toLowerCase();
    let responseText = '⚠️ O modelo digitado não foi encontrado em nosso sistema. \n\nProvavelmente, o modelo está disponível no Brasil. Para mais informações, acesse a página de encomendas e fale com um de nossos vendedores por e-mail. 📩\n\nPara buscar outro produto, digite o MODELO. ⌨️🔎';
    const callbackData = req.body.callback_query?.data;

    let endereco; 

    if (callbackData === 'buscar_cep') {
        return res.json({
            followupEventInput: {
                name: 'BUSCAR_CEP_EVENT',
                languageCode: 'pt-BR'
            }
        });
    }

    if (intent === 'Buscar CEP') {
        contexto.cep = req.body.queryResult.parameters['zip-code'];

        console.log("cep recebido: ", contexto.cep);

        if (!contexto.cep) {
            return res.json({ fulfillmentText: "📍 Para continuar, por favor, informe o CEP." });
        }

        let cepLimpo = contexto.cep.replace(/\D/g, ''); 

        console.log("cep limpo: ", cepLimpo);
        console.log("tamanho do cep: ", cepLimpo.length);

        if (cepLimpo.length !== 8) {
            return res.json({ fulfillmentText: "O CEP deve ter 8 dígitos." });
        }

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`); 

            if (response.data && response.data.erro) {
                return res.json({ fulfillmentText: "O CEP informado não foi encontrado. Verifique e tente novamente." });
            }

            endereco = response.data; 
            const mensagem = `📍 Aqui estão os detalhes do endereço para o CEP:  ${contexto.cep}: \n\n▸  Rua:  ${endereco.logradouro}\n▸  Bairro:  ${endereco.bairro}\n▸  Cidade:  ${endereco.localidade}\n▸  Estado:  ${endereco.uf}.\n\n— Se os dados estiverem corretos, digite CONFIRMAR. ✅`;

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




    if (intent === 'Modelos') {


            //TRATAMENTO DE EXCEÇÕES

        if (userQuery === ("waldman")||userQuery.includes("jackson")||userQuery.includes("prs")||userQuery.includes("epiphone")||userQuery.includes("tagima")||userQuery.includes("strinberg")) {
            responseText = '⚠️ O modelo digitado não foi encontrado em nosso sistema. \n\nProvavelmente, o modelo está disponível no Brasil. Para mais informações, acesse a página de encomendas e fale com um de nossos vendedores por e-mail. 📩\n\nPara buscar outro produto, digite o MODELO. ⌨️🔎';
        } 

        
       if (userQuery === ("mayones")) {
            contexto.valorInstrumento = 7921.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `Como você não especificou o modelo do seu instrumento, os valores das guitarras ${userQuery.toUpperCase()} começam a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        } 

        else if (userQuery.includes("standard"))  {  
            contexto.valorInstrumento = 7921.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("qatsi 7")||userQuery.includes("hydra")) {  
            contexto.valorInstrumento = 21157.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("legend")) {  
            contexto.valorInstrumento = 13999.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("v2")) {  
            contexto.valorInstrumento = 35999.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("custom shop 7")||userQuery.includes("7 custom shop")) {  
            contexto.valorInstrumento = 38999.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
            
        else if (userQuery.includes("7")) {  
            contexto.valorInstrumento = 19999.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("dirty")) {  
            contexto.valorInstrumento = 26505.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("custom shop")) {  
            contexto.valorInstrumento = 38999.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        
        else if (userQuery.includes("qatsi") || userQuery.includes("duvell") || userQuery.includes("regius")||userQuery.includes("aquila")) {  
            contexto.valorInstrumento = 14544.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }




        if (userQuery === ("strandberg")) {  //STRANDBERG
            contexto.valorInstrumento = 8614.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `Como você não especificou o modelo do seu instrumento, os valores das guitarras ${userQuery.toUpperCase()} começam a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        else if (userQuery.includes("boden standard"))  {  
            contexto.valorInstrumento = 16561.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
            
        else if (userQuery.includes("boden essencial")) {  
            contexto.valorInstrumento = 8614.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("boden metal")||userQuery.includes("boden original")) {  
            contexto.valorInstrumento = 18584.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("boden j artisan")|| userQuery.includes("boden artisan")) {  
            contexto.valorInstrumento = 79519.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("boden true temperament")) {  
            contexto.valorInstrumento = 33134.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

       else if (userQuery.includes("strandberg boden")) {  
            contexto.valorInstrumento = 8614.99;
           contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }


         if (userQuery === ("aristides")) {  //ARISTIDES
            contexto.valorInstrumento = 13204.99;
             contexto.nomeInstrumento = userQuery;
            responseText = `Como você não especificou o modelo do seu instrumento, os valores das guitarras ${userQuery.toUpperCase()} começam a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
         }
         else if (userQuery.includes("aristides 60")||userQuery.includes("aristides 060")) {  
            contexto.valorInstrumento = 13204.99;
             contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

         else if (userQuery.includes("aristides 70")||userQuery.includes("aristides 070")) {  
            contexto.valorInstrumento = 13744.99;
             contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

         else if (userQuery.includes("aristides 80")||userQuery.includes("aristides 080")) {  
            contexto.valorInstrumento = 14284.99;
             contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

         else if (userQuery.includes("aristides 060s")||userQuery.includes("aristides 060S")||userQuery.includes("aristides h/06")||userQuery.includes("aristides H/06")) {  
            contexto.valorInstrumento = 15094.99;
             contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
             
        else if (userQuery.includes("aristides 070s")||userQuery.includes("aristides 070S")||userQuery.includes("aristides h/07")||userQuery.includes("aristides H/76")) {  
            contexto.valorInstrumento = 15664.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
            
        else if (userQuery.includes("aristides 080s")||userQuery.includes("aristides 080S")||userQuery.includes("aristides h/08")||userQuery.includes("aristides H/08")) {  
            contexto.valorInstrumento = 16174.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("aristides h/09")||userQuery.includes("aristides H/09")) {  
            contexto.valorInstrumento = 16714.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("aristides t/0")||userQuery.includes("aristides T/0")||userQuery.includes("aristides T")||userQuery.includes("aristides t")) {  
            contexto.valorInstrumento = 13744.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }


        

         if (userQuery === ("ibanez")) {  //IBANEZ
            contexto.valorInstrumento = 4169.99;
             contexto.nomeInstrumento = userQuery;
            responseText = `Como você não especificou o modelo do seu instrumento, os valores das guitarras ${userQuery.toUpperCase()} começam a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
         }
          else if (userQuery.includes("azs")) {  
            contexto.valorInstrumento = 13224.99;
              contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

          else if (userQuery.includes("rgdms")||userQuery.includes("ibanez rgd series multiscale")||userQuery.includes("ibanez rgd series ms")) {  
            contexto.valorInstrumento = 7934.99;
              contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
          else if (userQuery.includes("rgd")) {  
            contexto.valorInstrumento = 4959.99;
              contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
          else if (userQuery.includes("x")) {  
            contexto.valorInstrumento = 7279.99;
              contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
          else if (userQuery.includes("iceman")) {  
            contexto.valorInstrumento = 4169.99;
              contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
          else if (userQuery.includes("signature")) {  
            contexto.valorInstrumento = 6614.99;
              contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }





        if (userQuery === ("fender")) {  //FENDER
            contexto.valorInstrumento = 3704.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `Como você não especificou o modelo do seu instrumento, os valores das guitarras ${userQuery.toUpperCase()} começam a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

         else if (userQuery.includes("fender signature")) {  
            contexto.valorInstrumento = 14544.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
            
        else if (userQuery.includes("stratocaster")||userQuery.includes("strato")) {  
            contexto.valorInstrumento = 4629.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        else if (userQuery.includes("telecaster")||userQuery.includes("tele")) {  
            contexto.valorInstrumento = 4959.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        else if (userQuery.includes("jazzmaster")||userQuery.includes("jazz")) {  
            contexto.valorInstrumento = 5299.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        else if (userQuery.includes("jaguar")) {  
            contexto.valorInstrumento = 3704.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        else if (userQuery.includes("limited")) {  
            contexto.valorInstrumento = 8589.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        else if (userQuery.includes("player")) {  
            contexto.valorInstrumento = 6614.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        


         if (userQuery === ("gibson")) {  //GIBSON
            contexto.valorInstrumento = 10579.99;
             contexto.nomeInstrumento = userQuery;
            responseText = `Como você não especificou o modelo do seu instrumento, os valores das guitarras ${userQuery.toUpperCase()} começam a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
         }
        else if (userQuery.includes("gibson custom shop")||userQuery.includes("gibson CUSTOM SHOP")) {  
            contexto.valorInstrumento = 24474.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("gibson sg")||userQuery.includes("gibson SG")) {  
            contexto.valorInstrumento = 11244.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("gibson es")||userQuery.includes("gibson ES")) {  
            contexto.valorInstrumento = 11904.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }

        else if (userQuery.includes("gibson flying v")||userQuery.includes("gibson flying V")) {  
            contexto.valorInstrumento = 12564.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
            
        else if (userQuery.includes("lespaul")||userQuery.includes("gibson les paul")||userQuery.includes("gibson lps")||userQuery.includes("gibson LPS")||userQuery.includes("gibson LES PAUL")||userQuery.includes("gibson LESPAUL")) {  
            contexto.valorInstrumento = 11244.99;
            contexto.nomeInstrumento = userQuery;
            responseText = `As guitarras ${userQuery.toUpperCase()} estão disponíveis a partir de: ${formatarMoeda(contexto.valorInstrumento)}. 🎸💰 \n\n⚠️ Os preços podem variar devido a impostos de importação, mudanças no câmbio e upgrades nos instrumentos (tanto Standard, Custom Shop e os modelos Signature)\n\n— Para simular impostos e frete, digite SIMULAR. ✈️ \n— Para finalizar o atendimento, digite SAIR. 👋`;
        }
        

        return res.json({ fulfillmentText: responseText });
    }

    if (intent === 'Calcular Imposto') {
        let cepLimpo = contexto.cep.replace(/\D/g, '');
        const cepNumerico = parseInt(cepLimpo);

        if (cepNumerico >= 11000000 && cepNumerico <= 19999999 || cepNumerico >= 90000000 && cepNumerico <= 99999999 || cepNumerico >= 88000000 && cepNumerico <= 89999999) {
            contexto.frete = 129.99;
        } else if (cepNumerico >= 20000000 && cepNumerico <= 28999999) {
            contexto.frete = 109.99;
        } else if (cepNumerico >= 29000000 && cepNumerico <= 29999999 || cepNumerico >= 78000000 && cepNumerico <= 78899999) {
            contexto.frete = 184.99;
        } else if (cepNumerico >= 30000000 && cepNumerico <= 39999999 || cepNumerico >= 72800000 && cepNumerico <= 72999999 || cepNumerico >= 73700000 && cepNumerico <= 76799999) {
            contexto.frete = 179.99;
        } else if (cepNumerico >= 80000000 && cepNumerico <= 87999999) {
            contexto.frete = 89.99;
        } else if (cepNumerico >= 40000000 && cepNumerico <= 69999999 || cepNumerico >= 76800000 && cepNumerico <= 76999999 || cepNumerico >= 77000000 && cepNumerico <= 77999999) {
            contexto.frete = 209.99;
        } else if (cepNumerico >= 70000000 && cepNumerico <= 72799999 || cepNumerico >= 73000000 && cepNumerico <= 73699999) {
            contexto.frete = 116.99;
        } else if (cepNumerico >= 79000000 && cepNumerico <= 79999999) {
            contexto.frete = 109.99;
        } else {
            contexto.frete = 120009.99;
        }

        let ipi = 0.10 * contexto.valorInstrumento;
        let ipi_total = contexto.valorInstrumento + ipi;
        let pis = 0.021 * ipi_total;
        let cofins = 0.0965 * ipi_total;
        let base_icms = ipi_total + pis + cofins;
        let icms = 0.18 * base_icms;
        let imposto_total = icms + base_icms + contexto.frete;
        
        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        endereco = response.data; 
        const mensagem = responseText = `✅ Confira abaixo todas as informações do seu pedido: \n\n🛒— PRODUTO —🛒\n\n▸  Equipamento:  ${contexto.nomeInstrumento.toUpperCase()}\n💰 VALOR INICIAL:  ${formatarMoeda(contexto.valorInstrumento)}\n\n\n🧾— IMPOSTOS —🧾  \n\n▸  IPI:  ${formatarMoeda(ipi)}\n▸  PIS:  ${formatarMoeda(pis)}\n▸  COFINS:  ${formatarMoeda(cofins)}\n▸  ICMS:  ${formatarMoeda(icms)}\n▸  Frete - Draven CIF:  ${formatarMoeda(contexto.frete)}\n💰 VALOR TOTAL:  ${formatarMoeda(imposto_total)}\n\n\n 📮— DADOS DO ENDEREÇO —📮 \n\n▸  CEP:  ${contexto.cep} \n▸  Rua:  ${endereco.logradouro}\n▸  Bairro:  ${endereco.bairro}\n▸  Cidade:  ${endereco.localidade}\n▸  Estado:  ${endereco.uf}\n\n\n🔗 Caso deseje fazer a encomenda do produto, basta clicar no link: https://marcusantana.github.io/front-endServer/encomende.html \n\n✨ Obrigado por falar com a gente!\n— Para refazer o atendimento, digite SAIR. 👋`;
    
    return res.json({ fulfillmentText: mensagem });
}

 return res.json({ fulfillmentText: "Desculpe, não entendi sua solicitação." });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
