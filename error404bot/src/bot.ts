import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not set in the environment');
}

const bot = new TelegramBot(token, {polling: true});

const API_BASE_URL = 'http://localhost:8080';

interface WalletResponse {
  id: string;
  address: string;
}

interface BalanceResponse {
  tokenBalances: {
    token: {
      name: string;
      blockchain: string;
    };
    amount: string;
  }[];
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  bot.sendMessage(chatId, `Welcome to the Wallet Query Bot! \nUse /wallet to create or get your wallet, use /balance to check your balance.`);
});

bot.onText(/\/wallet/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  
  if (!userId) {
    bot.sendMessage(chatId, 'Unable to get your user ID, please try again.');
    return;
  }

  try {
    const response = await axios.post<WalletResponse>(`${API_BASE_URL}/wallets`, { telegramId: userId });
    const walletAddress = response.data.address;
    const walletId = response.data.id;
    bot.sendMessage(chatId, `Your wallet address is: ${walletAddress}`);
  } catch (error) {
    console.error(`Error creating/getting wallet:`, error);
    bot.sendMessage(chatId, `Error creating/getting wallet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

bot.onText(/\/balance/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  
  if (!userId) {
    bot.sendMessage(chatId, 'Unable to get your user ID, please try again.');
    return;
  }

  try {
    const response = await axios.get<BalanceResponse>(`${API_BASE_URL}/balance/${userId}`);
    const balances = response.data.tokenBalances;
    let message = "Your wallet balance:\n\n";
    balances.forEach(balance => {
      message += `Token: ${balance.token.name}\n`;
      message += `Amount: ${balance.amount}\n`;
      message += `Blockchain: ${balance.token.blockchain}\n\n`;
    });
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error(`Error getting balance:`, error);
    bot.sendMessage(chatId, `Error getting balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

console.log('Bot is running...');
