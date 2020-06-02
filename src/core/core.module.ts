import { HttpErrorService } from "./http-error.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [HttpErrorService],
    exports: [HttpErrorService]
})
export class CoreModule { }