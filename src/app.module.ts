import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ CoreModule, ApiModule ],
  controllers: [AppController]
})
export class AppModule { }
