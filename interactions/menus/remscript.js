const { ActionRowBuilder, ButtonStyle, SelectMenuBuilder, ButtonBuilder } = require("discord.js")
const fsp = require('node:fs/promises');
const fs = require('node:fs');
module.exports = {
    data: {
        customId: "remscript",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]
            let script = interaction.values[0].split("|")[1]

            
            await fsp.rm(`./data/${interaction.user.id}/${game}/scripts/${script}`)

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

                    await interaction.update({ content: `Successfully removed the script \nYour scripts:\n\`\`\`${scripts} \`\`\``, components: [row, row2], ephemeral: false })
                } catch (e) {
                    console.log(e)
                    await interaction.reply({ content: "Sorry something went wrong", ephemeral: false })
                }
            });



        }
    }
}