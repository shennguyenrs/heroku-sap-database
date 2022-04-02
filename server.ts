import http from 'http';
import app from './app';
import logger from './utils/logger';
import { PORT } from './utils/config';

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
