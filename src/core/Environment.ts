// The desktop (Electron) build exposes `window.process.type === "renderer"`
// because it runs with nodeIntegration enabled. The web build never does,
// so this is a safe way to branch Electron-only behaviour (native dialogs,
// window controls, fs/os access) away from the browser build.
export function isElectron(): boolean {
  return typeof window !== "undefined" && !!(window as any).process?.type;
}
