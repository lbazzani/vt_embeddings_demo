import fs from 'fs';
import OpenAI from 'openai';
import "dotenv/config.js";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
})

//carico una variabnile news dal file json ./data/news.json
const news = JSON.parse(fs.readFileSync('./data/news.json'));


const newsEmbeddings = [];
async function calcolaEmbeddings() {
    for(let i=0; i<news.length; i++) {
        const newsitem = news[i];
        console.time('embeddings');
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: '[Titolo] ' + newsitem.title + ' [Descrizione] ' + newsitem.description,
            encoding_format: "float",
        });
        console.timeEnd('embeddings');
        console.log(embedding.usage);
        newsitem.embeddings = embedding.data[0].embedding;
        newsEmbeddings.push(newsitem);
    }
    fs.writeFileSync('./data/news-embeddings.json', JSON.stringify(newsEmbeddings));
  
}


calcolaEmbeddings();


