require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ask',
    description: 'Asks a question to the specified AI model',
    options: [
      {
        name: 'model',
        description: 'The AI model to query',
        required: true,
        type: 3, 
        choices: [
          {
            name: 'gpt3', 
            value: 'gpt-3.5-turbo',
          },
          {
            name: 'gpt4',
            value: 'gpt-4',  
          },
        ]
      },
      {
        name: 'question',
        description: 'The question to ask',
        required: true,
        type: 3
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering slash command...');

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { 
      body: commands
    });

    console.log('Successfully registered application commands.');

  } catch (error) {
    console.error(error);
  }
})();