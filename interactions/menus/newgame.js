const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require("discord.js")
const cp = require('node:child_process');
const fsp = require('node:fs/promises');
const path = require("path")
const fs = require('fs-extra');
module.exports = {
    data: {
        customId: "newgame",
        async execute(interaction) {
            let game = Number(interaction.values[0].split("|")[1]) + 1
           
            await fsp.mkdir(`./data/${interaction.user.id}/${game}`, { recursive: true })
            await fsp.mkdir(`./data/${interaction.user.id}/${game}/scripts`)
            await fsp.mkdir(`./data/${interaction.user.id}/${game}/maps`)
            //fs.copy('./template/', `./data/${interaction.user.id}/${game}`)

            //cp.exec("npm i", {cwd: path.join(process.cwd(), `/data/${interaction.user.id}/${game}/`)})

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
                .setDescription(game + "");

            await interaction.update({ content: "Created a new game", embeds: [embed, embed2], components: [row, row2], ephemeral: false });

        }
    }
}