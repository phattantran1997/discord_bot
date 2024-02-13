require('dotenv').config();
const { REST, Routes } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, process.env.COMMAND_ID))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);
