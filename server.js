const net = require('net');
//define host and port to run the server
const port = 1209;
const host = '127.0.0.1';
let tcpData = [];
let chunks = [];

//Declare connection listener function
const onClientConnection = sock => {
    //Log when a client connects.
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
    
    //Listen for data from the connected client.
    sock.on('data',  data => {
        chunks.push(data);
    }).on('end', () => {
        let temp = Buffer.concat(chunks);
        let stringData = temp.toString("utf-8").replace(/\0/g, '').trim();
        console.dir(stringData);
        let tcpData = JSON.parse(stringData);
        console.dir(tcpData)
    });
    //Handle client connection termination.
    sock.on('close', () => {
        console.log(`${sock.remoteAddress}:${sock.remotePort} Terminated the connection`);
    });
    //Handle Client connection error.
    sock.on('error', error => {
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });
};

//Create an instance of the server
const server = net.createServer(onClientConnection);
//Start listening with the server on given port and host.
server.listen(port, host, () => {
    console.log(`Server started on port ${port} at ${host}`);
});

