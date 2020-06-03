import { Injectable } from '@nestjs/common';
import { MessageHandlerService } from 'src/handler/message-handler.service';
import { PostbackHandlerService } from 'src/handler/postback-handler.service';

@Injectable()
export class WebhookService {

  constructor(private readonly messageHandler: MessageHandlerService, private readonly postbackHandler: PostbackHandlerService) { }

  parseEvent(entry: any) {
    if ('messaging' in entry && entry.messaging.length !== 0) {
      const event = entry.messaging[0];
      const sender_id = event.sender.id;
      if (event.message) {
        this.messageHandler.doHandle(sender_id, event.message);
      } else if (event.postback) {
        this.postbackHandler.doHandle(sender_id, event.postback);
      }
    }
  }
}
