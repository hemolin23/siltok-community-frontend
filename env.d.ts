declare namespace Cloudflare {
  interface Env {
    FILES: R2Bucket;
  }
}

declare module '*.sql?raw' {
  const sql: string;
  export default sql;
}
