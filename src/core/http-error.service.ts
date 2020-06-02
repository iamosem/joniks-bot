import { Injectable, HttpException } from "@nestjs/common";

@Injectable()
export class HttpErrorService {
    throw403(message: string) {
        throw new HttpException(message, 403);
    }

    throw404(message: string) {
        throw new HttpException(message, 404);
    }
}