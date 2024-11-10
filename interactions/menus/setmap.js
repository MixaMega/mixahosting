const { ActionRowBuilder, ButtonStyle, SelectMenuBuilder, ButtonBuilder } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: './data.sqlite' });

module.exports = {
    data: {
        customId: "setmap",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]
            let map = interaction.values[0].split("|")[1]

            await db.set(`${interaction.user.id}.${game}.map`,map)

            interaction.reply({ content: `Set the main map to be ${map}`, ephemeral: false })

        }
    }
}