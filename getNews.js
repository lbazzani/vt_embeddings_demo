

//prendo il json delle news da https://news.bazzify.com/topnews.json

import axios from 'axios';
import fs from 'fs';
import path from 'path';

const url = 'https://news.bazzify.com/topnews.json';


async function getNews() {

    const news = await axios.get(url);
    //salvo il json sul file ./data/news.json
    fs.writeFileSync("./data/news.json", JSON.stringify(news.data));

}

getNews();
