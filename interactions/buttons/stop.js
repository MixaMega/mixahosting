const { spawn } = require('node:child_process');
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: './data.sqlite' });
const on = new QuickDB({ filePath: './online.sqlite' });
const fsp = require("node:fs/promises")
const fs = require("node:fs")
module.exports = {
    data: {
        customId: "stop",
        async execute(interaction, { client, onlineGames }) {

            await interaction.deferReply({ ephemeral: false })
            game = interaction.customId.split("|")[1]

            //let up = await on.get(`${interaction.user.id}.${game}`)

            if (!onlineGames[interaction.user.id + ""] || !onlineGames[interaction.user.id + ""][game + ""]) {
                await interaction.editReply({ content: "Your game is not online!", ephemeral: false })
                return;
            }

            await interaction.editReply({ content: "Shutting down your game...", ephemeral: false })

            //const thekilling = spawn("taskkill", ["/F", '/pid', String(up)])

            onlineGames[interaction.user.id + ""][game + ""].kill()
            onlineGames[interaction.user.id + ""][game + ""] = null

            on.delete(`${interaction.user.id}.${game}`)

            // thekilling.on('error', async error => {
            //     await interaction.followUp({ content: `There was an error: ${error}`, ephemeral: false })
            //     return
            // })

            await interaction.editReply({ content: "Your game is now offline!", ephemeral: false })
        }
    }
}