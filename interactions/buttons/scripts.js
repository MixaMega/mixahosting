
const { ActionRowBuilder, ButtonStyle, SelectMenuBuilder, ButtonBuilder,StringSelectMenuBuilder } = require("discord.js")
const fsp = require('node:fs/promises');
const fs = require('node:fs');

module.exports = {
    data: {
        customId: "scripts",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]
            await interaction.deferReply({ ephemeral: false })

            try {
                await fsp.access(`./data/${interaction.user.id}/${game}/scripts/`)
            } catch (error) {
                await fsp.mkdir(`./data/${interaction.user.id}/${game}/scripts/`)
            }


            try {
                fs.readdir(`./data/${interaction.user.id}/${game}/scripts/`, async (err, files) => {
                    try {
                        let scripts = ""
                        let options = []

                        if (files.length > 0) {
                            files.forEach((file, index) => {

                                scripts += `[${index}] ${file} \n`

                                options.push({
                                    label: file.slice(0, 50),
                                    value: "remscript|" + file.slice(0, 50)
                                })

                            })
                        } else {
                            options = [{
                                label: "No scripts found!",
                                value: "none"
                            }]
                        }

                        let row = new ActionRowBuilder()
                            .addComponents(
                                new SelectMenuBuilder()
                                    .setCustomId('removescript|' + game)
                                    .setPlaceholder('Select a script to remove!')
                                    .addOptions(options),

                            );

                        let row2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('addscript|' + game)
                                    .setLabel('Add script')
                                    .setStyle(ButtonStyle.Primary)

                            );

                        await interaction.editReply({ content: `\`Use /addscript to add bigger scripts\`\nYour scripts:\n\`\`\`${scripts} \`\`\``, components: [row, row2], ephemeral: false })
                    } catch (e) {
                        console.log(error)
                        await interaction.edtReply({ content: "Sorry something went wrong", ephemeral: false })
                    }
                });


            } catch (error) {
                console.log(error)
                await interaction.editReply({ content: "Sorry something went wrong", ephemeral: false })
            }


        }
    }
}