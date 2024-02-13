require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');
const OpenAIApi = require('openai');

  const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY });
  const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});



client.on("ready", () => {
    console.log("Bot is ready")
})
//message 
client.on('messageCreate', function(msg){
    if(msg.content === 'ping'){
        msg.reply('pong');
    }else if (msg.content === "rtn is epic") {
        msg.react("❤️")
    }
});
client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;
  
    const { commandName, options} = interaction;
  
    if (commandName === 'ask') {
      
      const model = options.get('model').value; 
      const question = options.get('question').value;
      
  
      try {
        const stream = await openai.chat.completions.create({
          model:model,
          messages: [{ role: 'user', content: question }],
          stream: true,
          max_tokens: 3000,
          temperature: 0.5,
        });
        await interaction.deferReply();
        let fullResponse = '';

        for await(const part of stream) {
        
          const content = part.choices[0]?.delta?.content;
        
          if (content) {
            fullResponse += content;
          }
        }
        
        await interaction.followUp({
          content: fullResponse,
          ephemeral: true  // hide message from channel
        });
        
  
      } catch (error) {
        console.error(error);
        await interaction.editReply('Error getting response'); 
      }
  
    }
  
  });
  async function getResponse(completion) {
    const response = await functions.https.call('messageJarvis', { text: completion });
    return response;
  }  
client.login(process.env.BOT_TOKEN)
