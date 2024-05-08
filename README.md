# Embeddings Demo
Questo demo, realizzato durante un corso di formazione per sviluppatori AI, mostra come utilizzare gli embeddings di OpenAI per organizzare 100 notizie aggiornate in una rassegna stampa strutturata. Il codice raggruppa le notizie per argomento, generando un sommario per ogni categoria e fornendo i link agli articoli di giornale correlati.

This demo, developed during a training course for AI developers, demonstrates how to use OpenAI embeddings to organize 100 updated news items into a structured news digest. The code groups news by topic, generates a summary for each category, and provides links to related newspaper articles.

## Creare un file .env
```
OPENAI_API_KEY="xxx"
OPENAI_ORGANIZATION="xxx"
```

## Installare le dipendenze
```
npm install
```

## Eseguire i seguenti passi
```
node getNews.js
node getEnbeddings.js
node getGroups.js
node getRassegnaStampa.js
```

## Data Source
L'applicazione estrae notizie dal mio sito https://top100.news. Con un robot puppeteer in cloud, il servizio raccoglie le ultime news dalle principali testate nazionali e internazionali.

