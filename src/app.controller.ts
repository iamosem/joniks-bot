import { Controller, Get } from '@nestjs/common';
import { SendApiService } from './core/send-api.service';

@Controller()
export class AppController {
  constructor(private sendApiService: SendApiService) {
    this.init();
  }

  private init() {
    this.sendApiService.setGetStarted('testing get started');
    this.sendApiService.setGreetings([{
      locale: "default",
      text: "Hello!"
    }, {
      locale: "en_US",
      text: "Timeless apparel for the masses."
    }]);
  }

  @Get()
  getHello(): string {
    return 'Welcome to Joniks Bot!'
  }
}
