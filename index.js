/////////////////////////UTIL/////////////////////////
const aoi = require('aoi.js'); // Se conecta a NPM
const express = require('express');
const app = express();
const fs = require('fs');
/////////////////////////END UTIL/////////////////////////


const bot = new aoi.Bot({
    token: process.env.TK,
    prefix: '!',
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

bot.onMessage()

let dir = fs.readdirSync('./scr');

let i = 0;

handler: while (i < dir.length) {
    const stat = fs.statSync('./scr/' + dir[i]);

    if (stat.isDirectory()) {
        const readdir = fs.readdirSync('./scr/' + dir[i]);

        let nums = 0;
        while (nums < readdir.length) {
            dir.push(dir[i] + '/' + readdir[nums]);
            nums++;
        }
        i++;
        continue handler;
    } else if (stat.isFile()) {
        const command = require('./scr/' + dir[i]);
        try {
            bot[Object.keys(command)[0]](command[Object.keys(command)[0]]);
            i++;
            continue handler;
        } catch (err) {
            console.error(err.message);
            delete dir[i];

            continue handler;
        }
    } else {
        console.error('O diretório não é um arquivo nem uma pasta');
        delete dir[i];

        continue handler;
    }
}
