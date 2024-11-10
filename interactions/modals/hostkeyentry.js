const { QuickDB } = require("quick.db");
const hostKeyDB = new QuickDB({ filePath: './data.sqlite' });
module.exports = {
    data: {
        customId: "hostkeyentry",
        async execute(interaction) {
            // Get the data entered by the user
            let game = interaction.customId.split("|")[1]
            const hostkey = interaction.fields.getTextInputValue('hostkeyinputfield');
            await hostKeyDB.set(`${interaction.user.id}.${game}.hostkey`, hostkey)
            await interaction.reply({ content: 'Sucessfully set the host key!', ephemeral: false });
        }
    }
}