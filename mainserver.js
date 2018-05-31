const net = require("net");

const hostname = "127.0.0.1";
let port = 5000;

let serverStarted = false;

const server = net.createServer((socket) => {
    console.log(`Main server got pinged.`);
});

server.listen(port, hostname, () => {
    console.log(`Server ${port} started.`);
});
server.on("error", err => {
    console.log("Server error", err);
});