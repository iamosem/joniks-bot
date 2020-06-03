import { Injectable } from "@nestjs/common";
import { IHandler } from "./handler.service";

@Injectable()
export class PostbackHandlerService implements IHandler {

    constructor() {}
    
    doHandle(sender_id: string, message: any) {
        console.error('@@@ [POSTBACK] sender: ', sender_id, ' | message: ', message);
    }
}