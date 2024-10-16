import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'template-script.js');
    const scriptContent = await fs.readFile(filePath, 'utf-8');

    return NextResponse.json(
      scriptContent,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/javascript',
        },
      },
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to fetch template script' },
      { status: 500 },
    );
  }
}
