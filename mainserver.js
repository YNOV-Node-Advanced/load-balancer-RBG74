const net = require("net");

const hostname = "127.0.0.1";
let port = 5000;

const avaiablePorts = ["5001", "5002", "5003"];
let lastServerPinged = 5001;

const server = net.createServer(socket => {
    console.log("Main server got pinged.");
    socket.on("data", function(data) {
        let portToConnectTo = getPortToConnectTo(avaiablePorts);
        let sock = redirectRequest(portToConnectTo, data);
        sock.on("error", err => {
            console.log("sock error", err);
            let indexToRemove = avaiablePorts.indexOf(portToConnectTo);
            avaiablePorts.splice(indexToRemove, 1);
            if (avaiablePorts.length == 0) {
                server.close();
                
            }
            redirectRequest(getPortToConnectTo(avaiablePorts), data);
        });
        server.on("error", err => {
            console.log("server error", err);
            server.close();
        });
        sock.on("end", err => {
            console.log(err);
            server.close();
        });
        server.on("close", err => {
            console.log(err);
            sock.end();
        });
    });
});

function getPortToConnectTo(ports) {
    const port = ports.shift();
    ports.push(port);
    return port;
}

function redirectRequest(port, data) {
    return net.connect(port, hostname, function(connection) {
        console.log("Pinging server " + port);
        this.write(data);
    });
}

server.listen(port, hostname, () => {
    console.log(`Server ${port} started.`);
});
server.on("error", err => {
    console.log("Server error", err);
});
