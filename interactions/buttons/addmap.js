const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")

module.exports = {
    data: {
        customId: "addmap",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]

            const modal = new ModalBuilder()
                .setCustomId('addmapentry|' + game)
                .setTitle('Map addition');


            const mapname = new TextInputBuilder()
                .setCustomId('addmapnamefield')
                .setLabel("Enter your map name")
                .setPlaceholder("My map")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(50)
                .setMinLength(0)

            const map = new TextInputBuilder()
                .setCustomId('addmapfield')
                .setLabel("paste your map, For bigger maps use /addmap")
                .setPlaceholder(`B R I C K  W O R K S H O P  V0.2.0.0\n\n0 0 0\n0.13725 0.50980 0.2 1\n0.279496 0.2772 0.28\n100\n300`)
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
                .setMaxLength(4000)
                .setMinLength(67)

            const firstActionRow = new ActionRowBuilder().addComponents(mapname);
            const secondrow = new ActionRowBuilder().addComponents(map);
            modal.addComponents(firstActionRow, secondrow);
            await interaction.showModal(modal);

        }
    }
}
