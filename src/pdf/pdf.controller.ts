import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { PdfService } from './services/pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  create(@Body() createPdfDto: CreatePdfDto) {
    return; // this.pdfService.create(createPdfDto);
  }

  @Get()
  findAll() {
    return this.pdfService.findAll();
  }

  @Get('pdfMake')
  getPDFMake(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file_name = this.pdfService.getPDFMake();
    const file = createReadStream(join(process.cwd(), file_name));

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="' + file_name + '"',
    });
    return new StreamableFile(file);
  }

  @Get('pdfMakeWrapper')
  getPDFMakeWrapper(@Res({ passthrough: true }) res: Response) {
    //const file_name = this.pdfService.getPDFMakeWrapper();
    //const file = createReadStream(join(process.cwd(), file_name));
    //
    //res.set({
    //  'Content-Type': 'application/json',
    //  'Content-Disposition': 'attachment; filename="' + file_name + '"',
    //});
    //return new StreamableFile(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdfDto: UpdatePdfDto) {
    return this.pdfService.update(+id, updatePdfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pdfService.remove(+id);
  }
}
