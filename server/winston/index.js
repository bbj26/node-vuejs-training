const { createLogger, format, transports } = require('winston');
require('dotenv').config();
require('winston-mongodb');
const loggingLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
};
const dbFormat = format.combine(format.timestamp(), format.printf((log) => {
  return `[${log.level.toUpperCase().padEnd(7)}] - ${log.timestamp} - ${log.message}`;
}));

const logger = createLogger({
  levels: loggingLevels.levels,
  exitOnError: false,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }),
    new transports.MongoDB({
      db: process.env.DB_CONNECTION,
      collection: 'Logs',
      format: dbFormat,
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    })
  ],
  format: dbFormat,
});

module.exports = logger;