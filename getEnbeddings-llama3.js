import fs from 'fs';
import ollama from 'ollama'


//carico una variabnile news dal file json ./data/news.json
const news = JSON.parse(fs.readFileSync('./data/news.json'));


const newsEmbeddings = [];
async function calcolaEmbeddings() {
    for(let i=0; i<news.length; i++) {
        const newsitem = news[i];
        console.time('embeddings');

        const response = await ollama.embeddings({
            model: 'llama3',
            prompt: '[Titolo] ' + newsitem.title + ' [Descrizione] ' + newsitem.description,
        })

        console.timeEnd('embeddings');

        newsitem.embeddings = response.embedding;
        newsEmbeddings.push(newsitem);
    }
    fs.writeFileSync('./data/news-embeddings-llama3.json', JSON.stringify(newsEmbeddings));
  
}

calcolaEmbeddings();


