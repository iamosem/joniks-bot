import { Injectable } from "@nestjs/common";
import { IHandler } from "./handler.service";

@Injectable()
export class MessageHandlerService implements IHandler {

    constructor() {}
    
    doHandle(sender_id: string, message: any) {
        console.error('@@@ [MESSAGE] sender: ', sender_id, ' | message: ', message);
    }
}