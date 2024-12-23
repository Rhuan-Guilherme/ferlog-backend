import fastify from 'fastify';
import { env } from './env';
import { UserRoutes } from '@/http/controllers/users/router';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';

export const app = fastify();

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(UserRoutes);
