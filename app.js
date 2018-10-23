const config = require('config')
const getStars = require('./modules/getstars');
const TelegramBot = require('node-telegram-bot-api');

const token = config.get('telegramToken');

const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/stars/, (msg, match) => {
    const chatId = msg.chat.id;
    getStars().then(stars => bot.sendMessage(chatId, stars))
});

bot.onText(/\/star ([a-zA-Z0-9-]+)/, (msg, match) => {
    const chatId = msg.chat.id;
    getStars(match[1]).then(stars => {
        if(stars == "") {
            bot.sendMessage(chatId, "Error retrieving repo.")
        } else {
            bot.sendMessage(chatId, stars);
        }
    })   
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Use /stars to view stars of all JBoss repos, or use /star <reponame> to view stars of a single repo.");
});

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'Message received by bot.');
});