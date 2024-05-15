import fs from 'fs';
import OpenAI from 'openai';
import "dotenv/config.js";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
})

//carico una variabnile news dal file json ./data/news.json
const similarityGroups = JSON.parse(fs.readFileSync('./data/news-groupped.json'));


async function completions(news) {
    var response="";

    let messages = [
        {
            role: 'system',
            content: 'Fornisci un riassunto di massimo 5 righe dell array di notizie che ti manderà user in formato JSON. Rispondi sempre in italiano. Nel JSON di riposta metti due campi: titolo (sommario dei titoli) e descrizione' 
        },
        {
            role: 'user',
            content: JSON.stringify(news)
        }
    ];


    try {
        response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            response_format: { "type": "json_object" },
            messages: messages,
        });
    } catch (error) {
        console.error(error);
    }
    const msg=response?.choices[0]?.message?.content;
    return(msg);
}


let rassegnaStampa = [];
async function getRisposta() {
    for (const [key, value] of Object.entries(similarityGroups)) {
        let newsPrompt = [];

        let elementoRassegnaStampa = new Object();
        elementoRassegnaStampa.news=[];
        for(let i=0; i<value.length; i++) {
            let news = new Object();
            news.title= value[i].title;
            news.description = value[i].description;
            newsPrompt.push(news);
            //aggiunti per il salvataggio
            news.description = value[i].description;
            news.url = value[i].site_link;
            elementoRassegnaStampa.news.push(news);
        }

        let risposta = JSON.parse(await completions(newsPrompt));
        elementoRassegnaStampa.titolo = risposta?.titolo;
        elementoRassegnaStampa.descrizione = risposta?.descrizione;

        rassegnaStampa.push(elementoRassegnaStampa);

        console.log("Risposta:", risposta);
    }

    fs.writeFileSync('data/RassegnaStampa.json', JSON.stringify(rassegnaStampa));
}

getRisposta();  