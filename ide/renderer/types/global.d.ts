export {};

declare global {
  interface Window {
    electronAPI: {
      ipcBridge: (url: string, options?: IpcRequestOptions) => Promise<IpcResponse>;
      openFileDialog: () => Promise<string[]>;
    };
  }
}