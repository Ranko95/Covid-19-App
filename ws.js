/* eslint-disable no-restricted-syntax */
const WebSocketServer = require('ws').Server;
const moment = require('moment');
const app = require('./app');

const wss = new WebSocketServer({ app });

const connections = new Set();

wss.on('connection', (ws) => {
  connections.add(ws);

  ws.on('message', (message) => {
    const time = moment(new Date()).format('HH:mm');
    const messageData = {
      time,
      message,
    };
    for (const connection of connections) {
      connection.send(JSON.stringify(messageData));
    }
  });

  ws.on('close', () => {
    connections.delete(ws);
  });
});
