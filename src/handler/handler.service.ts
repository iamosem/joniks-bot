export interface IHandler {
    doHandle(sender_id: string, message: any): any;
}