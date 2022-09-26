import { Injectable } from '@nestjs/common';
import { PDFOptions, PDFService } from '@t00nday/nestjs-pdf';
import { Observable, SchedulerLike } from 'rxjs';
import { Readable } from 'stream';
import { FileInfo } from 'html-pdf';
import { Response } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly pdfService: PDFService) {}
  generatePDFToFile(
    template: string,
    filename: string,
    options?: PDFOptions,
    scheduler?: SchedulerLike,
  ): Observable<FileInfo> {
    return this.pdfService.toFile(template, filename, options, scheduler);
  }

  generatePDFToStream(
    template: string,
    options?: PDFOptions,
  ): Observable<Readable> {
    new Observable().subscribe;
    return this.pdfService.toStream(template, options);
  }

  async generatePDFToBuffer(
    template: string,
    res: Response,
    options?: PDFOptions,
  ) {
    const buffer = await this.pdfService
      .toBuffer(template, options)
      .subscribe((buffer) => {
        return this.closeBufferPdf(buffer, res);
      });
  }

  async closeBufferPdf(
    pdfBuffer: Buffer,
    res: Response,
    fileName = 'report.pdf',
    contentType = 'application/pdf',
  ) {
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': 'attachment; filename=' + fileName,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}
