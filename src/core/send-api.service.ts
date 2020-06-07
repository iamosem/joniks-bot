import { Injectable, HttpService } from '@nestjs/common';
import { ACCESS_TOKEN } from 'src/constants';
import { MESSAGING_TYPE, ATTACHMENT_TYPE } from 'src/model/message.model';

@Injectable()
export class SendApiService {
  private readonly SEND_API_URL = `https://graph.facebook.com/v7.0/me/messages?access_token=${ACCESS_TOKEN}`;

  constructor(private http: HttpService) {}

  setGetStarted(payload: string) {
    return this.http.post(
      this.SEND_API_URL,
      { 
        "get_started":{ payload }
      }
    );
  }

  setGreetings(greeting: { locale, text }[]) {
    return this.http.post(
      this.SEND_API_URL,
      { 
        "greeting":{ greeting }
      }
    );
  }

  sendMessageText(type: MESSAGING_TYPE, id: string, message: any) {
    return this.http.post(
      this.SEND_API_URL,
      this.constructTextMessagePayload(type, id, message),
    );
  }

  sendMessageTemplate(type: MESSAGING_TYPE, id: string, message: any) {
    return this.http.post(
      this.SEND_API_URL,
      this.constructTemplateMessagePayload(type, id, message),
    );
  }

  private constructTextMessagePayload(type: MESSAGING_TYPE, id: string, message: any) {
    return {
      messaging_type: type,
      recipient: { id },
      message: { text: message.text },
    };
  }

  private constructTemplateMessagePayload(type: MESSAGING_TYPE, id: string, message: any) {
    return {
      messaging_type: type,
      recipient: { id },
      message: {
        attachment: {
          type: ATTACHMENT_TYPE.TEMPLATE,
          payload: {
            template_type: 'generic',
            elements: [
              {
                title: message.title,
                subtitle: message.subtitle,
                image_url: message.image,
                buttons: message.postbackButtons,
              },
            ],
          },
        },
      },
    };
  }
}
