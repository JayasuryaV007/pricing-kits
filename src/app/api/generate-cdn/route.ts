import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { NextRequest, NextResponse } from 'next/server';

const s3Client = new S3({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.DO_SPACES_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { projectId, tooltips, metadata } = await req.json();

    const scriptContent = generateScriptTemplate(tooltips, metadata);

    const filename = `tooltip-script-${projectId}.js`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.DO_SPACES_NAME,
        Key: `template-script/${filename}`,
        Body: scriptContent,
        ACL: 'public-read',
        ContentType: 'application/javascript',
      },
    });

    const result = await upload.done();

    return NextResponse.json(
      {
        data: result.Location,
        message: 'CDN script generated successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error generating CDN:', error);
    return NextResponse.json(
      { message: 'Error generating CDN script' },
      { status: 500 },
    );
  }
}

function generateScriptTemplate(tooltips: any[], metadata: any): string {
  return `
      (function() {
        const tooltipConfig = {
            projectId: "${metadata.productName}",
            tooltips: ${JSON.stringify(tooltips)},
            metadata: ${JSON.stringify(metadata)}
          };
    
          // Styles
          const styles = \`
            .modern-tooltip-trigger {
              position: relative;
              display: inline-block;
              cursor: pointer;
            }
    
            .modern-tooltip-content {
              visibility: hidden;
              position: absolute;
              z-index: 1000;
              width: 300px;
              background: white;
              border-radius: 8px;
              padding: 16px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              opacity: 0;
              transition: all 0.2s ease;
              left: 100%;
              transform: translateX(-50%) translateY(8px);
              top: 50%;
            }
    
            .modern-tooltip-trigger:hover .modern-tooltip-content {
              visibility: visible;
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
    
            .modern-tooltip-header {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
            }
    
            .modern-tooltip-title {
              font-weight: 700;
              color: #000;
              font-size: 1.125rem;
              line-height: 1.75rem
            }
    
            .modern-tooltip-description {
              font-size: 1rem;
              line-height: 1.5rem
              color: #000;
              margin-bottom: 12px;
            }
    
            .modern-tooltip-image {
              width: 100%;
              height: auto;
              border-radius: 6px;
              margin-bottom: 12px;
            }
    
            .modern-tooltip-learn-more {
              display: inline-flex;
              align-items: center;
              padding: 8px 16px;
              background: #37796C;
              color: white;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 500;
              text-decoration: none;
              transition: background 0.2s ease;
            }
    
            .modern-tooltip-learn-more:hover {
              background: #2C6358;
            }
    
            .modern-tooltip-arrow {
              position: absolute;
              width: 12px;
              height: 12px;
              background: white;
              transform: rotate(45deg);
              top: -6px;
              left: calc(50% - 6px);
              box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.05);
            }
    
            @media (max-width: 768px) {
              .modern-tooltip-content {
                width: 260px;
              }
            }
          \`;
    
          // Add styles to head
          const styleSheet = document.createElement("style");
          styleSheet.textContent = styles;
          document.head.appendChild(styleSheet);  
       
          function parseTooltipText(jsonText) {
          try {
            return JSON.parse(jsonText);
          } catch (e) {
            console.error('Error parsing tooltip text:', e);
            return null;
          }
        }
  
        function findMatchingElement(tooltipData) {
          const elements = document.getElementsByTagName(tooltipData.tagName || 'div');

          for (let element of elements) {
            const matchesId = !tooltipData.id || element.id === tooltipData.id;
            const matchesClass = !tooltipData.className || element.className.includes(tooltipData.className);
            const matchesText = !tooltipData.text || element.textContent.includes(tooltipData.text);
            
            if (matchesId && matchesClass && matchesText) {
              return element;
            }
          }
          return null;
        }
        function initTooltips() {
            if (window.__NEXT_DATA__) {
              setTimeout(initTooltipsContent, 0);
            } else {
              initTooltipsContent();
            }
          }
          
        function initTooltipsContent() {
            tooltipConfig.tooltips.forEach(tooltip => {
                const tooltipData = parseTooltipText(tooltip.text);
                if (!tooltipData) return;
      
                const targetElement = findMatchingElement(tooltipData);
                if (!targetElement || targetElement.querySelector('.modern-tooltip-content')) {
                  return;
                }
      
                // Store original text content
                const originalText = targetElement.textContent;
                
                // Clear existing content but maintain the original text
                targetElement.textContent = originalText;
                targetElement.classList.add('modern-tooltip-trigger');
      
                // Create tooltip content
                const content = document.createElement('div');
                content.className = 'modern-tooltip-content';
                
                const arrow = document.createElement('div');
                arrow.className = 'modern-tooltip-arrow';
                
                content.innerHTML = \`
                  <div class="modern-tooltip-header">
                    <div class="modern-tooltip-title">\${tooltip.title || ''}</div>
                  </div>
                  <div class="modern-tooltip-description">
                    \${tooltip.description || ''}
                  </div>
                  \${tooltip.image_url ? \`
                    <img 
                      src="\${tooltip.image_url}" 
                      alt="\${tooltip.title || 'Tooltip image'}" 
                      class="modern-tooltip-image"
                      loading="lazy"
                    />
                  \` : ''}
                  \${tooltip.article_url ? \`
                    <a href="\${tooltip.article_url}" target="_blank" class="modern-tooltip-learn-more">
                      Learn More →
                    </a>
                  \` : ''}
                \`;
      
                content.appendChild(arrow);
      
                // Wait for hydration to complete before showing tooltip
                requestAnimationFrame(() => {
                  targetElement.appendChild(content);
                  content.style.display = ''; // Remove display none after hydration
                });      
  
            function updateTooltipPosition() {
              const rect = targetElement.getBoundingClientRect();
              const tooltipRect = content.getBoundingClientRect();
              const viewportWidth = window.innerWidth;
              
              if (rect.left + tooltipRect.width/2 > viewportWidth) {
                content.style.left = 'auto';
                content.style.right = '0';
                content.style.transform = 'translateY(8px)';
                arrow.style.left = 'auto';
                arrow.style.right = '20px';
              } else if (rect.left - tooltipRect.width/2 < 0) {
                content.style.left = '0';
                content.style.right = 'auto';
                content.style.transform = 'translateY(8px)';
                arrow.style.left = '20px';
                arrow.style.right = 'auto';
              } else {
                // Reset to default center position
                content.style.left = '50%';
                content.style.right = 'auto';
                content.style.transform = 'translateX(-50%) translateY(8px)';
                arrow.style.left = '50%';
                arrow.style.right = 'auto';
                arrow.style.transform = 'translateX(-50%) rotate(45deg)';
              }
            }
  
            // Event listeners
            targetElement.addEventListener('mouseenter', updateTooltipPosition);
            window.addEventListener('resize', updateTooltipPosition);
          });
        }
  
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initTooltips);
        } else {
          initTooltips();
        }
  
        const observer = new MutationObserver((mutations) => {
          initTooltipsContent();
        });
  
      })();
    `;
}
