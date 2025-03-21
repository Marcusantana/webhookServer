const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear o corpo da requisição como JSON
app.use(bodyParser.json());

// Rota para testar o webhook do Dialogflow
app.post('/webhook', (req, res) => {
    // Exibir a requisição recebida
    console.log('Requisição recebida: ', req.body);

    // Verifique o nome da intenção enviada do Dialogflow
    const intent = req.body.queryResult.intent.displayName;
    var userQuery = req.body.queryResult.queryText.toLowerCase(); // Correção aqui!

    // Responder ao Dialogflow com base na intenção
    let responseText = 'O modelo digitado não foi encontrado pelo nosso sistema. Provavelmente o modelo esta disponível no Brasil, para mais informações acesse a página de encomendas e fale com um dos nossos vendedores por e-mail.';
    
    if (intent === 'Modelos') {
        var valor = 0;

        if (userQuery === ("mayones")) {  //MAYONES
            valor = 7921.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("standard"))  {  
            valor = 7921.99;
            responseText = `Lindo! As guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }
            

        else if (userQuery.includes("qatsi 7")||userQuery.includes("hydra")) {  
            valor = 21157.99;
            responseText = `Boa escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("legend")) {  
            valor = 13999.99;
            responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("v2")) {  
            valor = 35999.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("custom shop 7")||userQuery.includes("7 custom shop")) {  
            valor = 38999.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }
            
        else if (userQuery.includes("7")) {  
            valor = 19999.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("dirty")) {  
            valor = 26505.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("custom shop")) {  
            valor = 38999.99;
            responseText = `A melhorzinha do momento! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }
        
        else if (userQuery.includes("qatsi") || userQuery.includes("duvell") || userQuery.includes("regius")||userQuery.includes("aquila")) {  
            valor = 14544.99;
            responseText = `Aí sim! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }




        if (userQuery === ("strandberg")) {  //STRANDBERG
            valor = 8614.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("boden standard"))  {  
            valor = 16561.99;
            responseText = `Lindo! As guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }
            
        else if (userQuery.includes("boden essencial")) {  
            valor = 8614.99;
            responseText = `Boa escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("boden metal")||userQuery.includes("boden original")) {  
            valor = 18584.99;
            responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("boden j artisan")|| userQuery.includes("boden artisan")) {  
            valor = 79519.99;
            responseText = `Ótimo! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("boden true temperament")) {  
            valor = 33134.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

       else if (userQuery.includes("strandberg boden")) {  
            valor = 8614.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }


         if (userQuery === ("aristides")) {  //ARISTIDES
            valor = 13204.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

         else if (userQuery.includes("aristides 60")||userQuery.includes("aristides 060")) {  
            valor = 13204.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

         else if (userQuery.includes("aristides 70")||userQuery.includes("aristides 070")) {  
            valor = 13744.99;
             responseText = `Boa! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

         else if (userQuery.includes("aristides 80")||userQuery.includes("aristides 080")) {  
            valor = 14284.99;
             responseText = `Top! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

         else if (userQuery.includes("aristides 060s")||userQuery.includes("aristides 060S")||userQuery.includes("aristides h/06")||userQuery.includes("aristides H/06")) {  
            valor = 15094.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }
             
        else if (userQuery.includes("aristides 070s")||userQuery.includes("aristides 070S")||userQuery.includes("aristides h/07")||userQuery.includes("aristides H/76")) {  
            valor = 15664.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }
            
        else if (userQuery.includes("aristides 080s")||userQuery.includes("aristides 080S")||userQuery.includes("aristides h/08")||userQuery.includes("aristides H/08")) {  
            valor = 16174.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("aristides h/09")||userQuery.includes("aristides H/09")) {  
            valor = 16714.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }

        else if (userQuery.includes("aristides t/0")||userQuery.includes("aristides T/0")||userQuery.includes("aristides T")||userQuery.includes("aristides t")) {  
            valor = 13744.99;
             responseText = `Perfeito! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e os CUSTOM SHOP).`;
        }


        

         if (userQuery === ("ibanez")) {  //IBANEZ
            valor = 4169.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

          else if (userQuery.includes("azs")) {  
            valor = 13224.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

          else if (userQuery.includes("rgdms")||userQuery.includes("ibanez rgd series multiscale")||userQuery.includes("ibanez rgd series ms")) {  
            valor = 7934.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
          else if (userQuery.includes("rgd")) {  
            valor = 4959.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
          else if (userQuery.includes("x")) {  
            valor = 7279.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
          else if (userQuery.includes("iceman")) {  
            valor = 4169.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
          else if (userQuery.includes("signature")) {  
            valor = 6614.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }





        if (userQuery === ("fender")) {  //FENDER
            valor = 3704.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
        else if (userQuery.includes("stratocaster")||userQuery.includes("strato")) {  
            valor = 4629.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
        else if (userQuery.includes("telecaster")||userQuery.includes("tele")) {  
            valor = 4959.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
        else if (userQuery.includes("jazzmaster")||userQuery.includes("jazz")) {  
            valor = 5299.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
        else if (userQuery.includes("jaguar")) {  
            valor = 3704.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
        else if (userQuery.includes("limited")) {  
            valor = 8589.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
        else if (userQuery.includes("player")) {  
            valor = 6614.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
        else if (userQuery.includes("fender signature")) {  
            valor = 14544.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

        


         if (userQuery === ("gibson")) {  //GIBSON
            valor = 10579.99;
            responseText = `Ótimo! Como você não especificou o modelo, o seu instrumento, as guitarras da ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

        else if (userQuery.includes("gibson custom shop")||userQuery.includes("gibson CUSTOM SHOP")) {  
            valor = 24474.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

        else if (userQuery.includes("gibson sg")||userQuery.includes("gibson SG")) {  
            valor = 11244.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

        else if (userQuery.includes("gibson es")||userQuery.includes("gibson ES")) {  
            valor = 11904.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

        else if (userQuery.includes("gibson flying v")||userQuery.includes("gibson flying V")) {  
            valor = 12564.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }
            
        else if (userQuery.includes("lespaul")||userQuery.includes("les paul")||userQuery.includes("lps")||userQuery.includes("LPS")||userQuery.includes("LES PAUL")||userQuery.includes("LESPAUL")) {  
            valor = 11244.99;
            responseText = `Sábia escolha! As guitarras ${userQuery.toUpperCase()} começam com o valor de: ${formatarMoeda(valor)} \nOs valores dos instrumentos estão sujeitos a alteração com os impostos de importação e as mudanças e upgrades no instrumento (tanto standard e as SIGNATURE).`;
        }

        
    
        
    } else if (intent === 'Despedida') {
        responseText = 'Até logo!';
    }

    // Enviar resposta para o Dialogflow
    return res.json({ fulfillmentText: responseText });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Função para formatar moeda corretamente
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
