import { Module } from '@nestjs/common';
import { MessageHandlerService } from './message-handler.service';
import { PostbackHandlerService } from './postback-handler.service';

@Module({
  providers: [MessageHandlerService, PostbackHandlerService],
  exports: [MessageHandlerService, PostbackHandlerService],
})
export class HandlerModule {}
