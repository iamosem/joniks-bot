import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  getTest(): string {
    return 'test!';
  }
}
