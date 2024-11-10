require('dotenv').config()

const net = require('net');
const pm2 = require("pm2")



const server = net.createServer((socket) => {
    
    console.log("Socket connected")

    socket.on('data', (data) => {
        let message;
        try {
            message = JSON.parse(data.toString().trim());
        } catch (error) {
            console.log(data.toString().trim())
            return socket.destroy(new Error("Can't parse data"));
        }

        switch (message.command) {
            case "start":

                break;

            default:
                socket.destroy(new Error("Unrecognized command"))
                break;
        }


    });

    // Event handler for client disconnection
    socket.on('end', () => {
        console.log('Socket disconnected');
    });
    socket.on("error", (e) => {
        console.log("Socket errored! -", e.message)
    })
});

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`GIMS listening on  ${process.env.HOST}:${process.env.PORT}`);
});