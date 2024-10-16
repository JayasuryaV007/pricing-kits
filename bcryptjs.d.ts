declare module 'bcryptjs' {
  export function genSaltSync(rounds: number): string;
  export function hashSync(data: any, salt: string): string;
  export function compareSync(data: string | Buffer, encrypted: string): boolean;
}
