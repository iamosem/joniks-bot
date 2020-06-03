import { Controller, Get, Body, Post, Query } from '@nestjs/common';
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
            return challenge;
        } else {
            this.httpErrorService.throw403('Handshake failed.');
        }
    }

    @Post()
    receiveEvent(
        @Body('object') object: any,
        @Body('entry') entries: any,
    ): string {
        if (object === 'page') {
            const self = this;
            entries.forEach(function (entry) {
                self.webhookService.parseEvent(entry);
            });
            return 'EVENT_RECEIVED';
        } else {
            this.httpErrorService.throw404('Request not found.');
        }
    }
}
