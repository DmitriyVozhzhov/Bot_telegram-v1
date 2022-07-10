const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5476219085:AAGHS17E-x0nDqZwoGdqQStA4P3sJXbRPJQ'

const bot = new TelegramApi(token, {polling:true})

const chats = {}


const startGame = async (chatId) => {
		await bot.sendMessage(chatId, `Сейчас я загадаю тебе число, а ты  ${msg.from.first_name} попробуй угадай`)
		const randomNumbers = Math.floor(Math.random() * 10);
		chats[chatId] = randomNumbers;
		await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}
const start = () => {
	bot.setMyCommands(
		[
			{command:'/start', description: 'Приветствие'},
			{command:'/info', description: 'Инфо о пользователе'},
			{command:'/game', description: 'Игра'}
		])
	
	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
		const lastName = msg.from.last_name
	
		if (text === '/start'){
		 await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/cdb/d29/cdbd2943-5c75-34c3-a339-bf6e9b524b53/2.webp`);
		 return bot.sendMessage(chatId, `Уёбок, добро пожаловать в Бот для оскарблений`);
		}
		if (text === '/info'){
		 return	bot.sendMessage(chatId, `Я назову тебя Уёбок, хотя другие называют тебя ${msg.from.first_name}  `)
		}
		if (text === '/game'){
			return startGame(chatId);
		} 

		return bot.sendMessage(chatId, "Ты написал непонятную залупу, напиши нормально" )
		//bot.sendMessage(chatId, `Ты написал мне ${text}`)
		
	})
	bot.on('callback_query', msg => {
		const data = msg.data
		const chatId = msg.message.chat.id
		if(data === '/again') {
		 	return	startGame(chatId);
		}
		if(data === chats[chatId]){
				return bot.sendMessage(chatId, `Поздравляю, ты отгадал цыфру ${chats[chatId]}`, againOptions)
		} else {
			return bot.sendMessage(chatId, `Ты не угадал, бот загадал цыфру ${chats[chatId]}`, againOptions)
		}
		//bot.sendMessage(chatId, `Ты выбрал цифру ${data} `)
	})
	
}

start()