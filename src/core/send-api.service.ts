import { Injectable, HttpService } from "@nestjs/common";
import { ACCESS_TOKEN } from "src/constants";

@Injectable()
export class SendApiService {

    private readonly SEND_API_URL = 'https://graph.facebook.com/v2.6/me/messages';

    constructor(private http: HttpService) { }

    sendMessageText(id: string, message: any) {
        return this.http.post(`${this.SEND_API_URL}?access_token=${ACCESS_TOKEN}`, this.constructTextMessagePayload(id, message));
    }

    sendMessageTemplate(id: string, message: any) {
        return this.http.post(`${this.SEND_API_URL}?access_token=${ACCESS_TOKEN}`, this.constructTemplateMessagePayload(id, message));
    }

    private constructTextMessagePayload(id: string, message: any) {
        return { recipient: { id }, message: { text: message.text } };
    }

    private constructTemplateMessagePayload(id: string, message: any) {
        return {
            recipient: { id },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: [{
                            title: message.title,
                            subtitle: message.subtitle,
                            image_url: message.image,
                            buttons: message.postbackButtons
                        }]
                    }
                }
            }
        };
    }

}