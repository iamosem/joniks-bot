import { Module } from '@nestjs/common';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';
import { CoreModule } from 'src/core/core.module';
import { HandlerModule } from 'src/handler/handler.module';

@Module({
    imports: [CoreModule, HandlerModule],
    controllers: [WebhookController],
    providers: [WebhookService]
})
export class ApiModule { }
