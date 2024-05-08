

//prendo il json delle news da https://news.bazzify.com/topnews.json

const axios = require('axios');
const fs = require('fs');
const { get } = require('http');
const path = require('path');

const url = 'https://news.bazzify.com/topnews.json';


async function getNews() {

    const news = await axios.get(url);
    //salvo il json sul file ./data/news.json
    fs.writeFileSync(path.resolve(__dirname, 'data/news.json'), JSON.stringify(news.data));

}

getNews();
