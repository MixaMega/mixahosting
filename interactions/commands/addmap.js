
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder,StringSelectMenuBuilder } = require('discord.js');

const fs = require("fs/promises")

const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: './data.sqlite' });

module.exports = {
    data: new SlashCommandBuilder()

        .setName('addmap')
        .setDescription('Add maps to your game')
        .addAttachmentOption(option =>
            option
                .setName('map')
                .setDescription(`Attach your .brk file`)
                .setRequired(true)),


    async execute(interaction) {
        const data = interaction.options.getAttachment("map")
        await interaction.deferReply({ ephemeral: false })

        if (!data.url.endsWith(".brk")) {
            interaction.editReply({ content: "Please select a BRK file", ephemeral: false })
            return
        }

        let files = await fs.readdir(`./data/${interaction.user.id}`)
        let options = []
        files.forEach(file => {
            options.push({ value: "MapGame|" + file, label: file })
        })

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('mapSelectGameId|' + data.url.slice(49))
                    .setPlaceholder('Select a game to add the map to')
                    .addOptions(options),
            )

        interaction.editReply({ components: [row], ephemeral: false })

    }
};