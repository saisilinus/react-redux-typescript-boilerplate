export {};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    msw: Record<string, any>;
  }
}
