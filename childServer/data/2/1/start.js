const nh = require('node-hill')

nh.startServer({
    port: 42480, // Your port id here (default is 42480)

    local: true, // Whether or not your server is local

    mapDirectory: './maps/', // The path to your maps folder.

    scripts: './scripts', // Your .js files path
})
// For more help: https://brickhill.gitlab.io/open-source/node-hill/interfaces/gamesettings.html
