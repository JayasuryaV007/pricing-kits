import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { message: 'URL parameter is required' },
        { status: 400 },
      );
    }

    const browser = await puppeteer.launch({
      //   headless: 'new', // Use new headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();

      await page.setViewport({
        width: 1280,
        height: 800,
      });

      await page.goto(url, {
        waitUntil: 'networkidle0', // Wait until network is idle
        timeout: 30000, // 30 second timeout
      });

      const html = await page.content();

      const title = await page.title();

      const screenshot = await page.screenshot({
        encoding: 'base64',
        fullPage: true,
      });

      return NextResponse.json(
        {
          data: html,
          metadata: {
            title,
            screenshot: `data:image/png;base64,${screenshot}`,
          },
        },
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } finally {
      await browser.close();
    }
  } catch (error: any) {
    console.error('Puppeteer error:', error);
    return NextResponse.json(
      { message: 'Error fetching URL: ' + error.message },
      { status: 500 },
    );
  }
}
