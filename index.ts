import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return; // Ignore bot messages

  // Ping command
  if (message.content === '!ping') {
    message.reply('Pong!');
  }

  // Server info
  else if (message.content === '!server') {
    if (message.guild) {
      message.reply(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    } else {
      message.reply('This command can only be used in a server.');
    }
  }

  // User info
  else if (message.content === '!user') {
    message.reply(`Your tag: ${message.author.tag}`);
  }
});

client.login(process.env.TOKEN);
