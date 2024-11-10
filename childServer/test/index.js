const net = require('net');

const client = new net.Socket();

client.connect(23000, 'localhost', () => {

	client.on("data", (data) => {
		let message = data.toString().trim();
		console.log(message)
		try {
			message = JSON.parse(data.toString().trim());
		} catch (error) {
			socket.destroy(new Error("Can't parse data"))
		}
	})

	client.on('end', () => {
		console.log('Socket disconnected');
	});

	client.on("error", (e) => {
		console.log("Socket errored! -", e.message)
	})

	client.write(JSON.stringify({
		command: "start"
	}))



});
