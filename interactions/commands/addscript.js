
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder,StringSelectMenuBuilder } = require('discord.js');

const fs = require("fs/promises")

module.exports = {
    data: new SlashCommandBuilder()

        .setName('addscript')
        .setDescription('Add scripts to your game')
        .addAttachmentOption(option =>
            option
                .setName('script')
                .setDescription(`Attach your script`)
                .setRequired(true)),


    async execute(interaction) {
        const data = interaction.options.getAttachment("script")
        await interaction.deferReply({ ephemeral: false })

        if (data.contentType !== 'application/javascript; charset=utf-8') {
            interaction.editReply({ content: "Please select a JS file", ephemeral: false })
            return
        }

        let files = await fs.readdir(`./data/${interaction.user.id}`)
        let options = []
        files.forEach(file => {
            options.push({ value: "ScriptGame|" + file, label: file })
        })

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('scriptSelectGameId|' + data.url.slice(49))
                    .setPlaceholder('Select a game to add the script to')
                    .addOptions(options),
            )

        /*axios(data.url)
            .then((html) => {
                await fs.writeFile(data.name, html)
            })*/
        interaction.editReply({ components: [row], ephemeral: false })


    }
};