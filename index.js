const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`
--------------------------------------------------------------------------
███████╗ ██╗███╗   ███╗██████╗ ██╗     ██╗ ██████╗██╗████████╗██╗   ██╗
██╔════╝███║████╗ ████║██╔══██╗██║     ██║██╔════╝██║╚══██╔══╝╚██╗ ██╔╝
███████╗╚██║██╔████╔██║██████╔╝██║     ██║██║     ██║   ██║    ╚████╔╝ 
╚════██║ ██║██║╚██╔╝██║██╔═══╝ ██║     ██║██║     ██║   ██║     ╚██╔╝   
███████║ ██║██║ ╚═╝ ██║██║     ███████╗██║╚██████╗██║   ██║      ██║   
╚══════╝ ╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝ ╚═════╝╚═╝   ╚═╝      ╚═╝   
--------------------------------------------------------------------------
--------------------------------------------------------------------------
Logged in as ${client.user.tag}
Running on ${client.guilds.cache.size} guilds
Detected ${client.users.cache.size} Users
Watching ${client.channels.cache.size} Channels
--------------------------------------------------------------------------
https://github.com/s1mplicity/js-bot
--------------------------------------------------------------------------
  `);
 client.user.setPresence({ status: 'dnd', activity: { name: '!ping - !pingembed', type: 'PLAYING'} });
});

client.on("message", async message => {
  if(message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(!message.content.startsWith(config.prefix)) return;

  if(command === "ping") {
    const m = await message.channel.send("Pong!");
    m.edit(`Pong! Latency ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency ${Math.round(client.ws.ping)}ms`);
  }

  if (command === "pingembed") {
    const timeTaken = Date.now() - message.createdTimestamp;
    const embed  = new Discord.MessageEmbed()
    .addFields(
      { name: '**Pong!**', value: `Latency ${timeTaken}ms.\nAPI Latency ${Math.round(client.ws.ping)}ms` },
    )
    .setTimestamp(new Date().toISOString())
    message.channel.send(embed);
  }
});


client.login(config.token);