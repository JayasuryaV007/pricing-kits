import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { message: 'URL parameter is required' },
      { status: 400 },
    );
  }

  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const baseUrl = new URL(url);

    // Process stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        link.setAttribute('href', new URL(href, baseUrl).href);
      }
    });

    // Process scripts
    document.querySelectorAll('script').forEach((script) => {
      const src = script.getAttribute('src');
      if (src && !src.startsWith('http')) {
        script.setAttribute('src', new URL(src, baseUrl).href);
      }
    });

    // Process images
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http')) {
        img.setAttribute('src', new URL(src, baseUrl).href);
      }

      const srcset = img.getAttribute('srcset');
      if (srcset) {
        const modifiedSrcset = srcset
          .split(',')
          .map((entry) => {
            const [src, size] = entry.trim().split(' ');
            if (!src.startsWith('http')) {
              return `${new URL(src, baseUrl).href} ${size}`;
            }
            return entry.trim();
          })
          .join(', ');

        img.setAttribute('srcset', modifiedSrcset);
      }
    });

    // Add selection tool script
    const script = document.createElement('script');
    script.textContent = `
        document.addEventListener('mouseover', function(e) {
            const target = e.target;
            target.dataset.prevOutline = target.style.outline;
            target.style.outline = '2px solid blue';
        });

        document.addEventListener('mouseout', function(e) {
            const target = e.target;
            target.style.outline = target.dataset.prevOutline;
        });

        document.addEventListener('click', function(e) {
            e.preventDefault();
            const selector = generateSelector(e.target);
            window.parent.postMessage({
                type: 'ELEMENT_SELECTED',
                selector: selector
            }, '*');
        });

      function generateSelector(element) {
        return JSON.stringify({
            id: element.id || '',
            className: element.className || '',
            tagName: element.tagName.toLowerCase(),
            text: element.textContent.trim(),
        });
      }
    `;
    document.head.appendChild(script);

    const modifiedHtml = dom.serialize();

    return new NextResponse(modifiedHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
