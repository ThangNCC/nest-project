import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { userMiddleWare } from './user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.use(userMiddleWare);

  // app.useGlobalGuards(new RolesGuard(Reflector));

  await app.listen(3000);
}
bootstrap();
