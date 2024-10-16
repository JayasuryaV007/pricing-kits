declare module 'potrace' {
    // Add the type definitions for the parts of potrace you use
    export interface TraceOptions {
      // example options, fill this in based on what the library supports
      turnPolicy?: number;
      turdSize?: number;
      alphaMax?: number;
      optCurve?: boolean;
      optTolerance?: number;
      threshold?: number;
      blackOnWhite?: boolean;
      color?: string;
      background?: string;
    }
  
    export interface PosterizeOptions extends TraceOptions {
      steps?: number;
    }
  
    export function trace(
      input: string | Buffer,
      options?: TraceOptions,
      callback: (err: Error, svg: string) => void
    ): void;
  
    export function posterize(
      input: string | Buffer,
      options?: PosterizeOptions,
      callback: (err: Error, svg: string) => void
    ): void;
  }
  