module.exports = {
    name: "hola",
    desc: "Sirve para ver la latencia del Bot",
    run: async (client, message, args, prefix) => {
        message.reply(`Hola! ${message.author.username}`)
    }
}