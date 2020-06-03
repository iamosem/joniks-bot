import { Injectable } from '@nestjs/common';
import { MessageHandlerService } from 'src/handler/message-handler.service';
import { PostbackHandlerService } from 'src/handler/postback-handler.service';
import { SendApiService } from 'src/core/send-api.service';
import { IMessage } from 'src/model/message.model';

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

      let response: IMessage;
      if (event.message) {
        response = this.messageHandler.doHandle(sender_id, event);
      } else if (event.postback) {
        response = this.postbackHandler.doHandle(sender_id, event);
      }

      if (response) {
        this.sendApiService
        .sendMessageText(sender_id, response)
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
