import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer');

@Injectable()
export class AppService {
  async getHello() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://blog.risingstack.com', {
      waitUntil: 'networkidle0',
    });
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();
    return pdf;
  }
}
