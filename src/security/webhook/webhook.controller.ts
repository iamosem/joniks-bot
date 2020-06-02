import { Controller, Get, Body, Post, Query, HttpException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { VERIFY_TOKEN } from 'src/constants';
import { HttpErrorService } from 'src/core/http-error.service';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly httpErrorService: HttpErrorService, private readonly webhookService: WebhookService) { }

    @Get()
    handshake(
        @Query('hub.mode') mode: string,
        @Query('hub.verify_token') token: string,
        @Query('hub.challenge') challenge: string,
    ): string {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.debug('@@@ WEBHOOK_VERIFIED');
            return challenge;
        } else {
            this.httpErrorService.throw403('Handshake failed.');
        }
    }

    @Post()
    receiveMessages(
        @Body() body: any,
        @Body('object') object: any,
        @Body('entry') entries: any,
    ): string {
        console.debug('@@@ body: ', body);
        console.debug('@@@ object: ', object);
        console.debug('@@@ entry: ', entries);
        if (object === 'page') {
            entries.forEach(function (entry) {
                const webhook_event = entry.messaging[0];
                console.debug('@@@ event: ', webhook_event);
            });
            return 'EVENT_RECEIVED';
        } else {
            this.httpErrorService.throw404('Request not found.');
        }
    }
}
