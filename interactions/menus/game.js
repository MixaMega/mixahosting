const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require("discord.js")
module.exports = {
    data: {
        customId: "game",
        async execute(interaction) {
            let game = interaction.values[0].split("|")[1]

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('setkey|' + game)
                        .setLabel('Set Host Key')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('scripts|' + game)
                        .setLabel('Scripts')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('maps|' + game)
                        .setLabel('Maps')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('start|' + game)
                        .setLabel('Start')
                        .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                        .setCustomId('stop|' + game)
                        .setLabel('Stop')
                        .setStyle(ButtonStyle.Danger),

                );
            const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('log|' + game)
                        .setLabel('Logs')
                        .setStyle(ButtonStyle.Primary),
                )
            const embed = new EmbedBuilder()
                .setTitle('Main menu')
            const embed2 = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Currently selected game')
                .setDescription(game);

            await interaction.update({ embeds: [embed, embed2], components: [row,row2], ephemeral: false });
        }
    }
}