import { IPostbackButton } from "./postback-buttons.model";

export interface IMessage {
    text?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    postbackButtons?: IPostbackButton[];
};

export class Message implements IMessage {
    constructor(
        public text?: string,
        public title?: string,
        public subtitle?: string,
        public image?: string,
        public postbackButtons?: IPostbackButton[]
    ) { }
}