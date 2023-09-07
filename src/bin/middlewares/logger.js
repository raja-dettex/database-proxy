const winston = require('winston');
const {LogstashTransport} = require('winston-logstash-transport');

const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new LogstashTransport({
      host: 'localhost',
      port: '5044'
    }),
  ],
});

module.exports = { Logger }