export interface IPostbackButton {
    type?: string;
    title?: string;
    payload?: string;
};

export class PostbackButton implements IPostbackButton {
    constructor(
        public type?: string,
        public title?: string,
        public payload?: string
    ) {}
}