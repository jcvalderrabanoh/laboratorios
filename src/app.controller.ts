import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() res: Response) {
    return await this.appService.generatePDFToBuffer('', res, {
      locals: {
        title: 'asas',
        foo: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa_______________Aaaaaaaaaaaaaaaaa',
      },
    });
  }
}
