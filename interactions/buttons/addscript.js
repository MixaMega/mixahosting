const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")

module.exports = {
    data: {
        customId: "addscript",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]

            const modal = new ModalBuilder()
                .setCustomId('addscriptentry|' + game)
                .setTitle('Script addition');


            const mapname = new TextInputBuilder()
                .setCustomId('addscriptnamefield')
                .setLabel("Enter your script name")
                .setPlaceholder("My script")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(50)
                .setMinLength(0)

            const map = new TextInputBuilder()
                .setCustomId('addscriptfield')
                .setLabel("paste your script here")
                .setPlaceholder(`console.log("Hello world!")`)
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
                .setMaxLength(4000)
                .setMinLength(0)

            const firstActionRow = new ActionRowBuilder().addComponents(mapname);
            const secondrow = new ActionRowBuilder().addComponents(map);
            modal.addComponents(firstActionRow, secondrow);
            await interaction.showModal(modal);

        }
    }
}