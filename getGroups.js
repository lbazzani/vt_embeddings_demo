const fs = require('fs');
const OpenAI = require("openai");
require("dotenv").config();
const path = require('path');

const news = JSON.parse(fs.readFileSync('./data/news-embeddings.json'));

function cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
        throw new Error("I vettori devono avere la stessa dimensione.");
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) {
        throw new Error("Uno dei vettori è il vettore zero, non può essere normalizzato.");
    }

    const similarity = dotProduct / (normA * normB);
    return similarity;
}

/*
let news1=news[0];
let news2=news[1];
console.log(news1.title);
console.log(news2.title);
console.log(cosineSimilarity(news1.embeddings, news2.embeddings));
*/

let soglia=0.5;
console.time('main');

let similarityGroups = {}

let callCount=0;
for(let i=0; i<news.length; i++) {
    let newitem1 = news[i];
    newitem1.elab=true;
    for(let j=i+1; j<news.length; j++) {
        let newitem2 = news[j];
        if(newitem2.elab) {
            continue;
        }
        let similarity= cosineSimilarity(newitem1.embeddings, newitem2.embeddings);
        callCount++;

        if(similarity>soglia) {
            if(!similarityGroups[newitem1.id]) {
                similarityGroups[newitem1.id] = [];
                similarityGroups[newitem1.id].push(newitem1);
            }
            newitem2.elab=true;
            newitem2.similarity=similarity;
            similarityGroups[newitem1.id].push(newitem2);

            /*
            console.log(newitem1.title + " - " + newitem1.domain);
            console.log(newitem2.title + " - " + newitem2.domain);
            console.log(similarity);
            console.log("--------------------");
            */
        }
    }
}


//loop sulle proprietà di similarityGroups
for (const [key, value] of Object.entries(similarityGroups)) {
    console.log("Gruppo di notizie simili:");
    for(let i=0; i<value.length; i++) {
        console.log(value[i].title + " - " + value[i].domain + " - " + value[i].similarity);
    }
    console.log("--------------------");
}

console.timeEnd('main');
console.log("Chiamate:", callCount);

fs.writeFileSync(path.resolve(__dirname, 'data/news-groupped.json'), JSON.stringify(similarityGroups));