import { app } from '@/app';
import { env } from './env';

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server listening in http://localhost:' + env.PORT);
  });
