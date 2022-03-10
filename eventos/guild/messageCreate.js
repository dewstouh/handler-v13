const config = require(`${process.cwd()}/config/config.json`)
const serverSchema =  require(`${process.cwd()}/modelos/servidor.js`)
const {asegurar, asegurar_todo} = require(`${process.cwd()}/handlers/funciones.js`)
module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;
    await asegurar_todo(message.guild.id, message.author.id);
    let data = await serverSchema.findOne({guildID: message.guild.id})
    if(!message.content.startsWith(data.prefijo)) return;
    const args = message.content.slice(data.prefijo.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if(command) {
        //ejecutar el comando
        command.run(client, message, args, data.prefijo)
    } else {
        //opcional
        return message.reply("❌ No he encontrado el comando que me has especificado!");
    }

}
