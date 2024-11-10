const { AttachmentBuilder } = require("discord.js")
const fsp = require('node:fs/promises');
const fs = require('node:fs');

module.exports = {
    data: {
        customId: "log",
        async execute(interaction) {
            let game = interaction.customId.split("|")[1]
            await interaction.deferReply({ ephemeral: false })


            fs.exists(`./data/${interaction.user.id}/${game}/log.txt`, async exists => {
                if(exists){
                    const file = new AttachmentBuilder(`./data/${interaction.user.id}/${game}/log.txt`);
                    await interaction.editReply({ files: [file], ephemeral: false })
                }else{
                    await interaction.editReply({ content: "Log file missing", ephemeral: false })
                }
            })

        }
    }
}