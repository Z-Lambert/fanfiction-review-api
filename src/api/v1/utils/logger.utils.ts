// logging library for better logging
import logger from 'pino';
// formating of timestamp
import dayjs from 'dayjs';

export const log = logger({
  // more human readable
  transport: {
    target: 'pino-pretty',
  },
  base: {
    // process id not needed in log
    pid: false,
  },
  // defining the timestamp
  timestamp: () => `,"time:":"${dayjs().format()}"`,
});
