import { Injectable } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  create(createPdfDto: CreatePdfDto) {
    return 'This action adds a new pdf';
  }

  async findAll(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      doc.on('pageAdded',()=>{
        doc.text('ghgasdhgsadasdjkgdsksah<fgjdgsaasddasóisajdiadsjdsóaisjdsaíjasdóidjssaijasóidjsasdisjadoasdhjśdaojiadssadjśadsdajoíasd', 100,100);
        doc.polygon([100, 0], [50, 100], [150, 100]);
        doc.stroke();

      });

      // customize your PDF document
      doc.text('hello world', 100, 50);
      doc
        .addPage()
        .fillColor('blue')
        .text('Here is a link!', 100, 100)
        .underline(100, 100, 160, 27, { color: '#0000FF' })
        .link(100, 100, 160, 27, 'http://google.com/');
      

      // Add another page
      doc
      .addPage()
      .fontSize(25)
      .text('Here is some vector graphics...', 100, 100);
      doc
        .addPage()
        .fontSize(25)
        .text('', 100, 100);
        doc
          .addPage()
          .fontSize(25)
          .text('', 100, 100);
          doc
            .addPage()
            .fontSize(25)
            .text('', 100, 100);

      // Draw a triangle
      doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

      // Apply some transforms and render an SVG path with the 'even-odd' fill rule
      doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

        doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));

      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdf`;
  }

  update(id: number, updatePdfDto: UpdatePdfDto) {
    return `This action updates a #${id} pdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdf`;
  }
}
