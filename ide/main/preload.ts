import { contextBridge, ipcRenderer } from "electron";
import * as fs from "fs";
import type { IpcRequestOptions, IpcResponse } from "@sharedTypes/ipc";

async function ipcBridge(
  url: string,
  options?: IpcRequestOptions
): Promise<IpcResponse> {
  if (!url) throw new Error("URL is required.");
  if (typeof url !== "string") throw new Error("URL must be a string.");

  if (options) {
    if (options.method === "GET" && options.body) throw new Error("GET requests cannot have a body.");
    if (options.method !== "GET" && !options.body) throw new Error("Non-GET requests must have a body.");
  }

  const response = await ipcRenderer.invoke("ipc::router", { url, options });
  return response;
}

async function openFileDialog(): Promise<string[]> {
  const result = await ipcRenderer.invoke("open-file-dialog");
  return result;
}

async function saveFileDialog(defaultName: string): Promise<string | undefined> {
  const result = await ipcRenderer.invoke("save-file-dialog", defaultName);
  return result;
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, "utf-8");
}


  async function isAppPackaged(): Promise<boolean> {
    const isPackaged = await ipcRenderer.invoke('get-app-is-packaged');
    return isPackaged;
  }

contextBridge.exposeInMainWorld("ipcBridge", ipcBridge);
contextBridge.exposeInMainWorld("electronAPI", {
  openFileDialog,
  saveFileDialog,
  readFile,
  writeFile,
  isAppPackaged
});
