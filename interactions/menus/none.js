module.exports = {
    data: {
        customId: "none",
        async execute(interaction) {
            interaction.reply({ content: "Why did you press that, what did you expect to happen?", ephemeral: false })
        }
    }
}