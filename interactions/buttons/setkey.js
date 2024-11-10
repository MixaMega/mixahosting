const { ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle } = require("discord.js")

module.exports = {
    data: {
        customId: "setkey",

        async execute(interaction) {
            let game = interaction.customId.split("|")[1]

            const modal = new ModalBuilder()
                .setCustomId('hostkeyentry|' + game)
                .setTitle('Host key setting');

            const favoriteColorInput = new TextInputBuilder()
                .setCustomId('hostkeyinputfield')
                .setLabel("Enter your host key")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(64)
                .setMinLength(64)

            const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
            modal.addComponents(firstActionRow);
            await interaction.showModal(modal);
        }
    }
}