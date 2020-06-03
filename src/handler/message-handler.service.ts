import { Injectable } from '@nestjs/common';
import { IHandler } from './handler.service';
import { IMessage, Message } from 'src/model/message.model';

@Injectable()
export class MessageHandlerService implements IHandler {
  constructor() {}

  doHandle(sender_id: string, event: any): IMessage {
    if (event.message.text) {
      return this.handleTextMessage(sender_id, event.message);
    } else if (event.message.attachments) {
      return this.handleAttachments(sender_id, event.message);
    }
    return null;
  }

  private handleTextMessage(sender_id: string, message: any): IMessage {
    console.error(
      '@@@ [MESSAGE-text] sender: ',
      sender_id,
      ' | message: ',
      JSON.stringify(message),
    );
    if (message.text.startsWith('debug-mode')) {
      return new Message(`you've sent a message: ${message.text}`);
    }
    return null;
  }

  private handleAttachments(sender_id: string, message: any): IMessage {
    console.error(
      '@@@ [MESSAGE-attachments] sender: ',
      sender_id,
      ' | message: ',
      JSON.stringify(message),
    );
    const attachment = message.attachments[0].payload.url;
    if (attachment) {
      return new Message(
        'test',
        "you've sent a picture",
        'choose your answer',
        attachment,
        [
          {
            type: 'postback',
            title: 'Yes!',
            payload: 'yes',
          },
          {
            type: 'postback',
            title: 'No!',
            payload: 'no',
          },
        ],
        true
      );
    }
    return null;
  }
}
