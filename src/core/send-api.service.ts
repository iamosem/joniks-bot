import { Injectable, HttpService } from "@nestjs/common";
import { ACCESS_TOKEN } from "src/constants";

@Injectable()
export class SendApiService {

    private readonly SEND_API_URL = 'https://graph.facebook.com/v2.6/me/messages';

    constructor(private http: HttpService) {}

    sendMessage(id: string, message: string) {
        const body = { recipient: { id }, message };
        return this.http.post(`${this.SEND_API_URL}?access_token=${ACCESS_TOKEN}`, body);
    }
}