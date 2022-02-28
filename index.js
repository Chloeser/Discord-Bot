const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const myintents = new Intents()
myintents.add(Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_TYPING );
const bot = new Client({ intents: myintents });
const config = require("./config.json");

//Startup
bot.on("ready", async () => {
	//This uploads the slash commands
	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '9' }).setToken(token);

	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
  // This event will run if the bot starts, and logs in, successfully.
	console.log(`Logged into ${bot.user.username.tag}`);
  bot.user.setActivity({activities: [{name: "with Choe's Sanity", type: "PLAYING"}], status: "online");
});
