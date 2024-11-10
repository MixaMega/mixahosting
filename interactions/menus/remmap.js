const { ActionRowBuilder, ButtonStyle, SelectMenuBuilder, ButtonBuilder,StringSelectMenuBuilder } = require("discord.js")
const fsp = require('node:fs/promises');
const fs = require('node:fs');
module.exports = {
    data: {
        customId: "remmap",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]
            let script = interaction.values[0].split("|")[1]
            
            
            await fsp.rm(`./data/${interaction.user.id}/${game}/maps/${script}`)
            
            fs.readdir(`./data/${interaction.user.id}/${game}/maps/`, async (err, files) => {
                try {
                    let scripts = ""
                    let options = []

                    if (files.length > 0) {
                        files.forEach((file, index) => {

                            scripts += `[${index}] ${file} \n`

                            options.push({
                                label: file.slice(0, 50),
                                value: "remmap|" + file.slice(0, 50)
                            })

                        })
                    } else {
                        options = [{
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

                    let row2 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('addmap|' + game)
                                .setLabel('Add map')
                                .setStyle(ButtonStyle.Primary)

                        );
                    await interaction.update({ content: `Successfully removed the map\nYour maps:\n\`\`\`${scripts} \`\`\``, components: [row, row2], ephemeral: false })
                    //interaction.message.delete()
                } catch (e) {
                    console.log(e)
                    await interaction.reply({ content: "Sorry something went wrong", ephemeral: false })
                }
            });
        }
    }
}