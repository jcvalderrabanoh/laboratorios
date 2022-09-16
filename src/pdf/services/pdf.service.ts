import { Injectable } from '@nestjs/common';
import { CreatePdfDto } from '../dto/create-pdf.dto';
import { UpdatePdfDto } from '../dto/update-pdf.dto';

import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';

@Injectable()
export class PdfService {
  getPDFMake() {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new PdfPrinter(fonts);
    let texts = [];

    for (let i = 0; i < 200; i++) {
      const color =
        '#' +
        (i % 10) +
        '' +
        (i % 9) +
        '' +
        (i % 8) +
        '' +
        (i % 7) +
        '' +
        (i % 6) +
        '' +
        (i % 5);
      const alignment = ['left', 'center', 'right', 'justify'];
      texts.push({
        text: 'Heading ' + i,
        fontSize: i / 8,
        bold: i % 2 == 0,
        color,
        alignment: alignment[i % alignment.length],
        characterSpacing: i % 10,
      });
    }

    const docDefinition = {
      header: function (currentPage, pageCount, pageSize) {
        // you can apply any logic and return any valid pdfmake element

        return [
          {
            text: 'simple text',
            alignment: currentPage % 2 ? 'left' : 'right',
          },
          {
            canvas: [
              { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 },
            ],
          },
        ];
      },
      content: [
        ...texts,
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              ['Val 1', 'Val 2', 'Val 3', 'Val 4'],
            ],
          },
        },
        { text: 'google', link: 'http://google.com', pageBreak: 'before' },
        { qr: 'text in QR', foreground: 'green', background: 'white' },
      ],
      defaultStyle: {
        font: 'Helvetica',
      },
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        anotherStyle: {
          italics: true,
          alignment: 'right',
        },
      },
    };

    const options = {};
    let file_name = 'src/pdf/pdfs/PDF.pdf';
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();
    return file_name;
  }

  findAll() {
    return `This action returns all pdf`;
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
