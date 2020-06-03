import { Injectable } from '@nestjs/common';
import { MessageHandlerService } from 'src/handler/message-handler.service';
import { PostbackHandlerService } from 'src/handler/postback-handler.service';
import { SendApiService } from 'src/core/send-api.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly messageHandler: MessageHandlerService,
    private readonly postbackHandler: PostbackHandlerService,
    private readonly sendApiService: SendApiService,
  ) {}

  parseEvent(entry: any) {
    if ('messaging' in entry && entry.messaging.length !== 0) {
      const event = entry.messaging[0];
      const sender_id = event.sender.id;
      if (event.message) {
        this.messageHandler.doHandle(sender_id, event.message);
      } else if (event.postback) {
        this.postbackHandler.doHandle(sender_id, event.postback);
      }


      if (event.message.text.startsWith('debug-mode')) {
        this.sendApiService
        .sendMessage(sender_id, `you've sent a message: ${event.message.text}`)
        .subscribe(
          () => this.subscribeToSendApiResponse(),
          (res: any) => this.subscribeToSendApiError(res),
        );
      }
    }
  }

  private subscribeToSendApiResponse() {
    console.debug('@@@ message sent');
  }

  private subscribeToSendApiError(res: any) {
    console.debug('@@@ message sending failed', res);
  }
}
