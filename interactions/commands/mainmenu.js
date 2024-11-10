const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder,StringSelectMenuBuilder } = require('discord.js');
const fs = require("fs/promises")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Main menu of the bot')
        .addIntegerOption(option=>option
            .setName("game")
            .setDescription("The id of the game to add the script to, if unsure leave blank")
            .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })

        try {
            await fs.access(`./data/${interaction.user.id}`)
        } catch (error) {
            await fs.mkdir(`./data/${interaction.user.id}`)
        }


        let files = await fs.readdir(`./data/${interaction.user.id}`)
        let options = []
        files.forEach(file => {
            options.push({ value: "game|" + file, label: file })
        })

        if (options.length < 10) {
            options = [...options, { label: "New game", value: "newgame|" + options.length }]
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('selectGameId')
                    .setPlaceholder('Select a game')
                    .addOptions(options),
            )


        await interaction.editReply({ components: [row], ephemeral: false });

    }
};