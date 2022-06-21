import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
  // providers: [CatsService],
  // exports: [CatsService]
})
export class CatsModule {}
