const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    console.log('Requisição recebida: ', req.body);

    const intent = req.body.queryResult.intent.displayName;
    const userQuery = req.body.queryResult.queryText.toLowerCase();
    const callbackData = req.body.callback_query?.data;


    if (callbackData === 'buscar_cep') {
        return res.json({
            followupEventInput: {
                name: 'BUSCAR_CEP_EVENT', // Nome do evento que você criará no Dialogflow
                languageCode: 'pt-BR'
            }
        });
    }

    
    if (intent === 'Buscar CEP') {
        let cep = req.body.queryResult.parameters['zip-code'];

        console.log("cep recebido: ", cep);

        if (!cep) {
            return res.json({ fulfillmentText: "Por favor, informe o CEP." });
        }

        cep = cep.replace(/\D/g, '');

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

    if (intent === 'Modelos') {
        let responseText = 'O modelo digitado não foi encontrado pelo nosso sistema. Provavelmente o modelo esta disponível no Brasil, para mais informações acesse a página de encomendas e fale com um dos nossos vendedores por e-mail.';
        let valor = 0;

        // ... (seu código de consulta de modelos aqui) ...
        if (userQuery === ("mayones")) {
            valor = 7921.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        } // ... (resto das condições) ...

        else if (userQuery.includes("standard"))  {  
            valor = 7921.99;
            responseText = `Lindo! As guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
            

        else if (userQuery.includes("qatsi 7")||userQuery.includes("hydra")) {  
            valor = 21157.99;
            responseText = `Boa escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("legend")) {  
            valor = 13999.99;
            responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("v2")) {  
            valor = 35999.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("custom shop 7")||userQuery.includes("7 custom shop")) {  
            valor = 38999.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
            
        else if (userQuery.includes("7")) {  
            valor = 19999.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("dirty")) {  
            valor = 26505.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("custom shop")) {  
            valor = 38999.99;
            responseText = `A melhorzinha do momento! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        
        else if (userQuery.includes("qatsi") || userQuery.includes("duvell") || userQuery.includes("regius")||userQuery.includes("aquila")) {  
            valor = 14544.99;
            responseText = `Aí sim! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }




        if (userQuery === ("strandberg")) {  //STRANDBERG
            valor = 8614.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("boden standard"))  {  
            valor = 16561.99;
            responseText = `Lindo! As guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
            
        else if (userQuery.includes("boden essencial")) {  
            valor = 8614.99;
            responseText = `Boa escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("boden metal")||userQuery.includes("boden original")) {  
            valor = 18584.99;
            responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("boden j artisan")|| userQuery.includes("boden artisan")) {  
            valor = 79519.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("boden true temperament")) {  
            valor = 33134.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

       else if (userQuery.includes("strandberg boden")) {  
            valor = 8614.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }


         if (userQuery === ("aristides")) {  //ARISTIDES
            valor = 13204.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

         else if (userQuery.includes("aristides 60")||userQuery.includes("aristides 060")) {  
            valor = 13204.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

         else if (userQuery.includes("aristides 70")||userQuery.includes("aristides 070")) {  
            valor = 13744.99;
             responseText = `Boa! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

         else if (userQuery.includes("aristides 80")||userQuery.includes("aristides 080")) {  
            valor = 14284.99;
             responseText = `Top! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

         else if (userQuery.includes("aristides 060s")||userQuery.includes("aristides 060S")||userQuery.includes("aristides h/06")||userQuery.includes("aristides H/06")) {  
            valor = 15094.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
             
        else if (userQuery.includes("aristides 070s")||userQuery.includes("aristides 070S")||userQuery.includes("aristides h/07")||userQuery.includes("aristides H/76")) {  
            valor = 15664.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
            
        else if (userQuery.includes("aristides 080s")||userQuery.includes("aristides 080S")||userQuery.includes("aristides h/08")||userQuery.includes("aristides H/08")) {  
            valor = 16174.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("aristides h/09")||userQuery.includes("aristides H/09")) {  
            valor = 16714.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("aristides t/0")||userQuery.includes("aristides T/0")||userQuery.includes("aristides T")||userQuery.includes("aristides t")) {  
            valor = 13744.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }


        

         if (userQuery === ("ibanez")) {  //IBANEZ
            valor = 4169.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

          else if (userQuery.includes("azs")) {  
            valor = 13224.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

          else if (userQuery.includes("rgdms")||userQuery.includes("ibanez rgd series multiscale")||userQuery.includes("ibanez rgd series ms")) {  
            valor = 7934.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
          else if (userQuery.includes("rgd")) {  
            valor = 4959.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
          else if (userQuery.includes("x")) {  
            valor = 7279.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
          else if (userQuery.includes("iceman")) {  
            valor = 4169.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
          else if (userQuery.includes("signature")) {  
            valor = 6614.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }





        if (userQuery === ("fender")) {  //FENDER
            valor = 3704.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        else if (userQuery.includes("stratocaster")||userQuery.includes("strato")) {  
            valor = 4629.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        else if (userQuery.includes("telecaster")||userQuery.includes("tele")) {  
            valor = 4959.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        else if (userQuery.includes("jazzmaster")||userQuery.includes("jazz")) {  
            valor = 5299.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        else if (userQuery.includes("jaguar")) {  
            valor = 3704.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        else if (userQuery.includes("limited")) {  
            valor = 8589.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        else if (userQuery.includes("player")) {  
            valor = 6614.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
        else if (userQuery.includes("fender signature")) {  
            valor = 14544.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        


         if (userQuery === ("gibson")) {  //GIBSON
            valor = 10579.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("gibson custom shop")||userQuery.includes("gibson CUSTOM SHOP")) {  
            valor = 24474.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("gibson sg")||userQuery.includes("gibson SG")) {  
            valor = 11244.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("gibson es")||userQuery.includes("gibson ES")) {  
            valor = 11904.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        else if (userQuery.includes("gibson flying v")||userQuery.includes("gibson flying V")) {  
            valor = 12564.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }
            
        else if (userQuery.includes("lespaul")||userQuery.includes("les paul")||userQuery.includes("lps")||userQuery.includes("LPS")||userQuery.includes("LES PAUL")||userQuery.includes("LESPAUL")) {  
            valor = 11244.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).\n\nSe deseja simular os impostos de importação e frete digite SIMULAR ou SAIR para finalizar o atendimento.`;
        }

        return res.json({ fulfillmentText: responseText });
    }

    return res.json({ fulfillmentText: "Desculpe, não entendi sua solicitação." });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
