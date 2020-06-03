import { HttpErrorService } from './http-error.service';
import { Module } from '@nestjs/common';
import { HandlerModule } from 'src/handler/handler.module';

@Module({
  providers: [HttpErrorService, HandlerModule],
  exports: [HttpErrorService, HandlerModule],
})
export class CoreModule {}
