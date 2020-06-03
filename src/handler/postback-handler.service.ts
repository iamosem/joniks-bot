import { Injectable } from "@nestjs/common";
import { IHandler } from "./handler.service";
import { IMessage } from "src/model/message.model";

@Injectable()
export class PostbackHandlerService implements IHandler {

    constructor() {}
    
    doHandle(sender_id: string, message: any): IMessage {
        console.error('@@@ [POSTBACK] sender: ', sender_id, ' | message: ', JSON.stringify(message));
        return null;
    }
}