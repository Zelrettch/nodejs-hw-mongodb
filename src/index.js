import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';

async function bootstrap() {
  await initMongoDB();
  setupServer();
}

bootstrap();
