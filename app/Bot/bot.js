require("dotenv").config()
const { Telegraf } = require("telegraf")
const TOKEN = '7374650291:AAFhMGi0kV9R6DeUOiX7IL14et05MGUs2OI';
const bot = new Telegraf(TOKEN);


const web_link = "https://vocal-babka-debd9a.netlify.app"

bot.start((ctx) => {
    const startPayload = ctx.startPlayload;
    const urlSent = `${web_link}?ref=${startPayload}`
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username}` : user.first_name;
    ctx.replyWithMarkdown(`!Hey, ${userName}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Start now!", web_app: { url: urlSent } }],
            ],
            in: true
        }
    })
})



bot.launch()