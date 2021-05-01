const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "help",
    description: "Pour voir toutes les commandes",
    usage: "[command]",
    aliases: ["commands", "help me", "pls help"]
  },

  run: async function(client, message, args) {
    var allcmds = "";

    client.commands.forEach(cmd => {
      let cmdinfo = cmd.info;
      allcmds +=
        "`" +
        client.config.prefix +
        cmdinfo.name +
        " " +
        cmdinfo.usage +
        "` ~ " +
        cmdinfo.description +
        "\n";
    });

    let embed = new MessageEmbed()
      .setAuthor(
        "Commands of " + client.user.username,
        "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif"
      )
      .setColor("YELLOW")
      .setDescription(allcmds)
      .setFooter(
        `Pour obtenir des informations sur chaque commande, vous pouvez faire ${client.config.prefix}help [command] | By J0jo`
      );

    if (!args[0]) return message.channel.send(embed);
    else {
      let cmd = args[0];
      let command = client.commands.get(cmd);
      if (!command)
        command = client.commands.find(x => x.info.aliases.includes(cmd));
      if (!command) return message.channel.send("Unknown Command");
      let commandinfo = new MessageEmbed()
        .setTitle("Command: " + command.info.name + " info")
        .setColor("YELLOW").setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Aliases: ${command.info.aliases.join(", ")}
`);
      message.channel.send(commandinfo);
    }
  }
};

