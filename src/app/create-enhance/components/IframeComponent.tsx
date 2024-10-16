// import React, { useState, useEffect, useRef } from 'react';
// import { ElementData } from './StepOne';
// interface AssetData {
//   [key: string]: any;
// }

// const IframeComponent = ({
//   url,
//   setButtonDisabled,
//   setSelectedElement,
// }: {
//   url: string;
//   setButtonDisabled: any;
//   setSelectedElement: any;
// }) => {
//   const [assetData, setAssetData] = useState<AssetData | null>(null);
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   const handleOverlayClick = (e: any) => {
//     console.log('object');
//     if (iframeRef.current && iframeRef.current.contentDocument) {
//       const iframeDocument = iframeRef.current.contentDocument;

//       const iframeRect = iframeRef.current.getBoundingClientRect();

//       const iframeX = e.clientX - iframeRect.left;
//       const iframeY = e.clientY - iframeRect.top;

//       const element = iframeDocument.elementFromPoint(iframeX, iframeY);

//       if (element) {
//         const elementData: ElementData = {
//           id: element.id,
//           className: element.className,
//           tagName: element.tagName,
//           text: element.innerHTML,
//         };
//         console.log(iframeX, iframeY, element.innerHTML);
//         setSelectedElement(elementData);
//         setButtonDisabled(false);
//         fetchAssetData(elementData);
//       }
//     }
//   };

//   const fetchAssetData = async (elementData: ElementData) => {
//     const response = await fetch('/api/getAssetData', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(elementData),
//     });
//     const data: AssetData = await response.json();
//     setAssetData(data);
//   };

//   return (
//     <>
//       <div className="flex h-screen">
//         <div className="relative flex-grow">
//           <iframe
//             ref={iframeRef}
//             src={url}
//             className="w-full h-full border-2"
//           />
//           <p className="absolute inset-0 z-10 pointer-events-none" onClick={handleOverlayClick} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default IframeComponent;

import React, { useState, useEffect, useRef } from 'react';

interface ElementData {
  id: string;
  className: string;
  tagName: string;
  text: string;
}

interface AssetData {
  [key: string]: any;
}

interface IframeComponentProps {
  url: string;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<ElementData | null>>;
}

const IframeComponent: React.FC<IframeComponentProps> = ({
  url,
  setButtonDisabled,
  setSelectedElement,
}) => {
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the template JS script
    const script = document.createElement('script');
    script.src = '/api/getTemplateScript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    const overlay = overlayRef.current;
    if (iframe && overlay) {
      iframe.onload = () => {
        iframe.style.height = `${iframe.contentWindow?.document.body.scrollHeight}px`;
        overlay.style.height = iframe.style.height;
      };
    }
  }, [url]);

  const handleOverlayInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const iframeDocument = iframeRef.current.contentDocument;
      const iframeRect = iframeRef.current.getBoundingClientRect();

      const iframeX = e.clientX - iframeRect.left;
      const iframeY =
        e.clientY - iframeRect.top + iframeRef.current.contentWindow!.scrollY;

      const element = iframeDocument.elementFromPoint(
        iframeX,
        iframeY,
      ) as HTMLElement;

      if (element) {
        const elementData: ElementData = {
          id: element.id,
          className: element.className,
          tagName: element.tagName,
          text: element.innerHTML,
        };
        console.log(iframeX, iframeY, element.innerHTML);
        setSelectedElement(elementData);
        setButtonDisabled(false);
        fetchAssetData(elementData);
      }
    }
  };

  const handleIframeScroll = () => {
    if (overlayRef.current && iframeRef.current) {
      overlayRef.current.scrollTop = iframeRef.current.contentWindow!.scrollY;
    }
  };

  const fetchAssetData = async (elementData: ElementData) => {
    try {
      const response = await fetch('/api/getAssetData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elementData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: AssetData = await response.json();
      setAssetData(data);
    } catch (error) {
      console.error('Error fetching asset data:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="relative flex-grow overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-screen overflow-auto border-2"
          title="Content iframe"
          onScroll={handleIframeScroll}
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          onClick={handleOverlayInteraction}
          style={{ cursor: 'pointer' }}
        >
          <div className="w-full h-full pointer-events-auto" />
        </div>
      </div>
    </div>
  );
};

export default IframeComponent;
