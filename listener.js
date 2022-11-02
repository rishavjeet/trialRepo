const nats = require('node-nats-streaming');
const {randomBytes} = require('crypto');
console.clear();
const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url: 'http://localhost:4222',
});
stan.on('connect',()=>{
    console.log('Listener connected to NATS');
    const option = stan.subscriptionOptions().setManualAckMode(true);
    const subscription = stan.subscribe('data-created','test-queue-group');
    subscription.on('message',(msg)=>{
        console.log('Message Received');
        const data = msg.getData();
        console.log(`Message of Seq No.: ${msg.getSequence()} and data: ${data}`);
        msg.ack();
    });
});