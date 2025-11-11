import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3001);
  const frontendUrl = configService.get('FRONTEND_URL', 'http://localhost:3000');

  // Security
  app.use(helmet());

  // CORS - Allow frontend and production URLs
  app.enableCors({
    origin: [frontendUrl, 'https://*.onrender.com', 'https://*.vercel.app'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Quantum Grace API')
    .setDescription('Track. Build. Evolve. - REST API for the Quantum Grace platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('habits', 'Habit tracking')
    .addTag('logs', 'Session logs')
    .addTag('goals', 'Goal management')
    .addTag('pomodoro', 'Pomodoro timer')
    .addTag('analytics', 'Analytics and insights')
    .addTag('gamification', 'Streaks, badges, leaderboards')
    .addTag('ai', 'AI coaching features')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Listen on 0.0.0.0 to accept external connections (required for Render/cloud hosting)
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Quantum Grace API running on http://0.0.0.0:${port}`);
  console.log(`📚 API Documentation: http://0.0.0.0:${port}/api/docs`);
  console.log(`🌍 Server is accessible from external networks`);
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
