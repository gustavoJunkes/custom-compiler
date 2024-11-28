declare global {
    interface Window {
      ipcBridge: (url: string, options?: IpcRequestOptions) => Promise<IpcResponse>;
      electronAPI: {
        openFileDialog: () => Promise<string[]>;
        readFile: (filePath: string) => string;
      };
    }
  }