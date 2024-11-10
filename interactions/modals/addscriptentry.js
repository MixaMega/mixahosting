const fsp = require("node:fs/promises")
module.exports = {
    data: {
        customId: "addscriptentry",
        async execute(interaction) {
            await interaction.deferReply({ ephemeral: false })
            // Get the data entered by the user
            let game = interaction.customId.split("|")[1]

            let name = interaction.fields.getTextInputValue("addscriptnamefield")
            let data = interaction.fields.getTextInputValue("addscriptfield")

            name.replace(/[^a-z0-9.]/gi, '')  
            
            if (!name.endsWith(".js")) name += ".js"

            await fsp.writeFile(`./data/${interaction.user.id}/${game}/scripts/${name}`, data)

            interaction.editReply({ content: "Successfully added the script", ephemeral: false })
        }
    }
}
