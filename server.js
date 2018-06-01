const net = require("net");

const hostname = "127.0.0.1";
let port = 5001;

createServer(hostname, port);

function createServer(hostname, port) {
    const server = net.createServer((socket) => {
        console.log(`Server ${port} was pinged.`);
    });

    server.listen(port, hostname, () => {
        console.log(`Server ${port} started.`);
    });
    server.on("error", err => {
        if (err.code == 'EADDRINUSE') {
            createServer(hostname, port+1);
        }
    });
}
