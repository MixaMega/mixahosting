
const { ActionRowBuilder, ButtonStyle, SelectMenuBuilder, ButtonBuilder, StringSelectMenuBuilder } = require("discord.js")
const fsp = require('node:fs/promises');
const fs = require('node:fs');

module.exports = {
    data: {
        customId: "maps",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]
            await interaction.deferReply({ ephemeral: false })

            try {
                await fsp.access(`./data/${interaction.user.id}/${game}/maps/`)
            } catch (error) {
                await fsp.mkdir(`./data/${interaction.user.id}/${game}/maps/`)
            }


            try {
                fs.readdir(`./data/${interaction.user.id}/${game}/maps/`, async (err, files) => {
                    try {
                        let scripts = ""
                        let options = []
                        let options2 = []

                        if (files.length > 0) {
                            files.forEach((file, index) => {

                                scripts += `[${index}] ${file} \n`

                                options.push({
                                    label: file.slice(0, 50),
                                    value: "remmap|" + file.slice(0, 50)
                                })
                                options2.push({
                                    label: file.slice(0, 50),
                                    value: "setmap|" + file.slice(0, 50)
                                })

                            })
                        } else {
                            options = [{
                                label: "No maps found!",
                                value: "none"
                            }]
                            options2 = [{
                                label: "No maps found!",
                                value: "none"
                            }]
                        }

                        let row = new ActionRowBuilder()
                            .addComponents(
                                new SelectMenuBuilder()
                                    .setCustomId('removemap|' + game)
                                    .setPlaceholder('Select a map to remove!')
                                    .addOptions(options),

                            );
                        let row3 = new ActionRowBuilder()
                            .addComponents(
                                new SelectMenuBuilder()
                                    .setCustomId('setmap|' + game)
                                    .setPlaceholder('Select a map to set as the main map')
                                    .addOptions(options2),

                            );

                        await interaction.editReply({ content: `\`Use /addmap to add maps\`\nYour maps:\n\`\`\`${scripts} \`\`\``, components: [row, row3], ephemeral: false })
                    } catch (e) {
                        console.log(e)
                        await interaction.editReply({ content: "Sorry something went wrong", ephemeral: false })
                    }
                });


            } catch (error) {
                console.log(error)
                await interaction.editReply({ content: "Sorry something went wrong", ephemeral: false })
            }


        }
    }
}