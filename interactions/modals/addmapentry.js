const fsp = require("node:fs/promises")
module.exports = {
    data: {
        customId: "addmapentry",
        async execute(interaction) {
            // Get the data entered by the user
            await interaction.deferReply({ ephemeral: false })
            let game = interaction.customId.split("|")[1]

            let name = interaction.fields.getTextInputValue("addmapnamefield")
            let data = interaction.fields.getTextInputValue("addmapfield")

            name.replace(/[^a-z0-9.]/gi, '')

            if (!name.endsWith(".brk")) name += ".brk"

            await fsp.writeFile(`./data/${interaction.user.id}/${game}/maps/${name}`, data)

            interaction.editReply({ content: "Successfully added the map", ephemeral: false })
        }
    }
}