import { HttpErrorService } from './http-error.service';
import { Module, HttpModule } from '@nestjs/common';
import { HandlerModule } from 'src/handler/handler.module';
import { SendApiService } from './send-api.service';

@Module({
    imports: [HttpModule],
    providers: [HttpErrorService, HandlerModule, SendApiService],
    exports: [HttpErrorService, HandlerModule, SendApiService],
})
export class CoreModule { }
