const nats = require('node-nats-streaming');
const {randomBytes} = require('crypto');
console.clear();
const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url: 'http://localhost:4222',
});
stan.on('connect',()=>{
    console.log('Publisher connected to NATS');
    const data = JSON.stringify({
        id: '123',
        title: 'Trial Data',
        price: 569,
    });
    stan.publish('data-created',data,()=>{
        console.log('Event published');
    })
});