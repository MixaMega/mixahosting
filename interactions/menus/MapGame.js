const fsp = require('node:fs/promises');
const fs = require('node:fs');
const https = require("https")

module.exports = {
    data: {
        customId: "MapGame",
        async execute(interaction) {
            let game = interaction.values[0].split("|")[1]
            let url = interaction.customId.split("|")[1]
            //console.log(interaction.customId)
            try {
                await fsp.access(`./data/${interaction.user.id}/${game}/maps`)
            } catch (error) {
                await fsp.mkdir(`./data/${interaction.user.id}/${game}/maps`)
            }
    
            https.get("https://cdn.discordapp.com/ephemeral-attachments/" + url, (res) => {
                //console.log("https://cdn.discordapp.com/ephemeral-attachments/" + url)
                const file = fs.createWriteStream(`./data/${interaction.user.id}/${game}/maps/${url
    
                    .split('/')[url.split('/').length - 1]      //get the file name
                    .slice(0, -3)                                 //remove the .js
                    .replace(/[^a-z0-9]/gi, '')             //thanks jake for cool regex
                    .slice(0, 50)                               //max length 
    
                    }.brk`);
    
                res.pipe(file);
    
                file.on('finish', () => {
                    file.close();
                    interaction.update({ content: "Added the map", components: [], ephemeral: false })
                });
    
                //console.log(html.data)
                //await fsp.writeFile(`./data/${interaction.user.id}/${game}/scripts/script.js`, html.data)
            }).on("error", (err) => {
                console.log("Error: ", err.message);
                interaction.reply({ content: "Sorry something went wrong", components: [], ephemeral: false })
            });
        }
    }
}