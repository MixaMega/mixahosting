const db = new QuickDB({ filePath: './data.sqlite' });
const fsp = require("fs/promises")
module.exports = {
    data: {
        customId: "start",
        async execute(interaction, { onlineGames, client }) {
            await interaction.deferReply({ ephemeral: false })
            game = interaction.customId.split("|")[1]
            //let up = await on.get(`${interaction.user.id}.${game}`)
            if (onlineGames[interaction.user.id + ""] && onlineGames[interaction.user.id + ""][game + ""]) {
                await interaction.editReply({ content: "Your game is already online!", ephemeral: false })
                return;
            }

            await on.set(`${interaction.user.id}.${game}`, "starting")
            if (!onlineGames[interaction.user.id + ""]) onlineGames[interaction.user.id + ""] = {}

            await interaction.editReply({ content: "Starting your game..", ephemeral: false })

            let startjs = {//the start js file
                hostKey: await db.get(`${interaction.user.id}.${game}.hostkey`),
                port: sum(interaction.user.id) + Number(game),
                local: false,
                cli: false,
                map: await db.get(`${interaction.user.id}.${game}.map`),
                mapDirectory: path.join(process.cwd(), `/data/${interaction.user.id}/${game}/maps`),
                scripts: path.join(process.cwd(), `/data/${interaction.user.id}/${game}/scripts`),
                modules: [
                    "axios"
                ]
            }

            //some checks
            if (!startjs.hostKey) {
                await interaction.followUp({ content: "Please add a host key", ephemeral: false })
                return
            }
            if (!startjs.map) {
                await interaction.followUp({ content: "Please set the main map", ephemeral: false })
                return
            }

            //write the startjs file
            await fsp.writeFile(`./data/${interaction.user.id}/${game}/start.js`, `const nh = require('node-hill')\n\nnh.startServer(${JSON.stringify(startjs)})`)

            //start the game
            // const start = spawn(`node`, [path.join(process.cwd(), `/data/${interaction.user.id}/${game}/start.js`)])

        }
    }
}