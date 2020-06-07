import { IPostbackButton } from "./postback-buttons.model";

export const enum MESSAGING_TYPE {
    RESPONSE,
    UPDATE,
    MESSAGE_TAG
};

export const enum ATTACHMENT_TYPE {
    AUDIO = 'audio',
    VIDEO = 'video',
    IMAGE = 'image',
    FILE = 'file',
    TEMPLATE = 'template'
};

export interface IMessage {
    text?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    postbackButtons?: IPostbackButton[];
    isTemplate?: boolean;
};

export class Message implements IMessage {
    constructor(
        public text?: string,
        public title?: string,
        public subtitle?: string,
        public image?: string,
        public postbackButtons?: IPostbackButton[],
        public isTemplate?: boolean
    ) { }
}