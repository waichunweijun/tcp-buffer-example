var net = require('net');
const buffer = require('buffer');
let host = '127.0.0.1';
let port = 1209;
var client = new net.Socket();
const { performance } = require('perf_hooks');

let data = [];
let numOfSample = 9999;

for(let i=0; i<numOfSample; i++){

    data.push({"test":`${i}`})
}

console.log(data);
let dataBuffer = Buffer.alloc(1024*numOfSample);

dataBuffer.write(JSON.stringify(data) ,'utf-8');

client.connect(port, host, () => {
    client.setKeepAlive(true,60000)
    console.time('test');
    const t0 = performance.now();
    try{
        client.write(dataBuffer);
        client.end();
    }
    catch(err){
        console.log(err);
    }
    
    console.log("sent");

    console.timeEnd('test');
});


client.on('close', () => {
    console.log('Connection closed');
});


