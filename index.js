require('dotenv').config('./.env')
const TelegramBot = require('node-telegram-bot-api');
const readline = require('readline');
const { stdin, stdout } = require('process');
const mail = require('./libs/mail');

const token = process.env.TOKEN;

console.log(process.env.TOKEN)

const bot = new TelegramBot(token, {polling: true});

rl = readline.createInterface({ input: stdin, output: stdout });
const chatIdDefault = 6152261778;

async function main() {
  // Matches "/echo [whatever]"
  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[0]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

  // Listen for any kind of message. There are different kinds of
  // messages.
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log('[+] chatId: ', chatId)
    console.log('[+] msg: ', msg)

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  });

  console.log('[+] message: ')
  rl.on('line', async (input) => {
    let [error, data] = await bot.sendMessage(chatIdDefault, input)
      .then(data => [null, data])
      .catch(error => [error, null]);
    if (error) {
      console.log('[-] Error: ', error)
      mail.sendMail(
        process.env.MAIL_TO,
        'Bạn có một tin nhắn ở Telegram',
        `<body>
          Vui long chon linh để kích hoạt tin nhắn
          <a href="https://t.me/noan2_test_bot">https://t.me/noan2_test_bot</a> 
        </body>` 
      ).then(() => console.log('[+] send mail success'))
      .catch((error) => console.log('[-] send mail false: ', error))
    }
    console.log('[+] message: ')
  }); 
}

main();