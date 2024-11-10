const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const https = require("https")

const { spawn } = require('node:child_process');
let onlineGames = {}

const { Client, Collection, GatewayIntentBits, ButtonBuilder, SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { QuickDB } = require("quick.db");
const hostKeyDB = new QuickDB({ filePath: './data.sqlite' });
const on = new QuickDB({ filePath: './online.sqlite' });

//command fuckery
client.commands = new Collection();
const commandsPath = path.join(__dirname, '..', 'interactions', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`🚀 MixaHosting has been deployed! Logged in as ${client.user.tag}!`);
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client);
    } catch (error) {
        if(error.rawError && error.rawError.code === 10062)return;
        console.error(error);
        try {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        } catch (error) {
            try {
                await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
            } catch (error) { }
        }
    }
});

//buttons fuckery
client.buttons = new Collection();
const buttonsPath = path.join(__dirname, '..', 'interactions', 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const command = require(filePath);
    client.buttons.set(command.data.customId, command);
}
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    //console.log(interaction)
    const button = client.buttons.get(interaction.customId.split('|')[0]);
    if (!button) return;
    try {
        await button.data.execute(interaction, { client: client, onlineGames: onlineGames });
    } catch (error) {
        if(error.rawError && error.rawError.code === 10062)return;
        console.error(error);
        try {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        } catch (error) {
            try {
                await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
            } catch (error) { }
        }
    }
});

//menus fuckery
client.menus = new Collection();
const menusPath = path.join(__dirname, '..', 'interactions', 'menus');
const menuFiles = fs.readdirSync(menusPath).filter(file => file.endsWith('.js'));
for (const file of menuFiles) {
    const filePath = path.join(menusPath, file);
    const command = require(filePath);
    client.menus.set(command.data.customId, command);
}
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    const menu = client.menus.get(interaction.values[0].split('|')[0]);
    if (!menu) return;
    try {
        await menu.data.execute(interaction, client);
    } catch (error) {
        if(error.rawError && error.rawError.code === 10062)return;
        console.error(error);
        try {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        } catch (error) {
            try {
                await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
            } catch (error) { }
        }
    }
});
//modals fuckery
client.modals = new Collection();
const modalsPath = path.join(__dirname, '..', 'interactions', 'modals');
const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));
for (const file of modalFiles) {
    const filePath = path.join(modalsPath, file);
    const command = require(filePath);
    client.modals.set(command.data.customId, command);
}
client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;
    const menu = client.modals.get(interaction.customId.split('|')[0]);
    if (!menu) return;
    try {
        await menu.data.execute(interaction, client);
    } catch (error) {
        console.error(error);
        try {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        } catch (error) {
            try {
                await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
            } catch (error) { }
        }
    }
});

on.all().then(thing => {
    console.log(thing)
    thing.forEach(user => {
        const id = user.id
        Object.entries(user.value).forEach(async entry => {
            const [key, value] = entry;
            if (value === "starting") {
                on.delete(`${id}.${key}`)
                return;
            }
            const start = spawn(`node`, [path.join(process.cwd(), `/data/${id}/${key}/start.js`)])

            if (!onlineGames[id + ""]) onlineGames[id + ""] = {}
            onlineGames[id + ""][key + ""] = start

            await on.set(`${id}.${key}`, true)

            try {
                fs.rmSync(`./data/${id}/${key}/log.txt`)
            } catch (error) { }
            const logStream = fs.createWriteStream(`./data/${id}/${key}/log.txt`, { flags: 'a', force: true });

            start.stdout.pipe(logStream)
            start.stderr.pipe(logStream)
        });
    });
})
client.login("INSERTTOKENHERE");

/*[
    { id: '472408309895266306', value: {} },
    { id: '266365894907789333', value: { '1': 'starting' } },
    { id: '658026084041883650', value: { '1': 8736 } },
    { id: '792944035529621534', value: { '1': 7556 } },
    { id: '392654845741367306', value: { '1': 'starting' } },
    { id: '400023564708872192', value: { '1': 5980 } }
]*/