const Telegraf = require('telegraf')
const telegrafLogger = require('telegraf-logger')
const fs = require('fs')
const sleep = require('sleep');
const colors = require('colors');
require('dotenv').config();

var error = colors.red;
var log = colors.green;

const path = process.env.FILES_PATH
const chatId = process.env.CHAT_ID
const bot = new Telegraf(process.env.BOT_TOKEN)
const folders = ["rain_princess", "wreck", "la_muse", "udnie", "wave", "scream"]

photos = []

console.log(path)
bot.use(telegrafLogger())


folders.forEach(folder => {
	fs.readdirSync(`${path}/${folder}`).forEach(file => {
		let filePath = `${path}/${folder}/${file}`;
		let caption = `#${folder}`;
		let photo = {"filePath": filePath, "caption": caption, "name": `#${file}`};
		photos.push(photo);
	})
})

console.log(`------------------------------
			| FICHEROS                     |
			------------------------------`);
photos.forEach(photo => {
	console.log(photo.filePath);
})
console.log("Fotos totales: " + photos.length)

/*
bot.command('/photos', (ctx) => {
	photos.forEach(photo => {
		console.log(log(`Photo: ${photo}`))
		ctx.replyWithPhoto({ source: photo.filePath }, {caption: photo.caption})
			.then((response) => console.log("OK"))
			.catch((error) => console.error("Error"));
		//sleep.sleep(10);
	})
	
})
*/

bot.command('/prueba', async (ctx) => {
	for(const [i, photo] of photos.entries()){
		try {
			await ctx.replyWithPhoto({ source: photo.filePath }, {caption: `${photo.caption} ${photo.name}`})
			console.log(log(`${i}: ${photo.filePath}`));
		} catch (err) {
			console.err(error(`${i}: ${photo.filePath}`))
		}
	}
		

	
})


bot.startPolling()
