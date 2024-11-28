import createWindow from "@main/lib/helpers/createWindow";
import StorageService from "@main/lib/helpers/storageService";
import { spawn } from "child_process";
import cors from 'cors';
import type { BrowserWindow } from "electron";
import { app, dialog, ipcMain } from "electron";
import serve from "electron-serve";
import express from 'express';
import fs from 'fs';
import path from 'path';

if (app.isPackaged) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

const storage = new StorageService();
let mainWindow: BrowserWindow;

const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());

server.post('/compile', async (req: express.Request, res: express.Response) => {
    try {
      console.log(req.body);
  
      const [filePath, content]: [string, string] = req.body.content;
  
      const jarPath = app.isPackaged
        ? path.join(process.resourcesPath, 'resources/main', 'compiler-backend.jar')
        : path.join('main', 'compiler-backend.jar');
  
      fs.writeFileSync(filePath, content, 'utf-8');
  
      console.log(`Arquivo salvo em: ${filePath}`);
  
      const javaProcess = spawn('java', ['-Dfile.encoding=UTF-8', '-jar', jarPath, content, filePath]);
  
      let jarOutput = '';
      let jarError = '';
  
      javaProcess.stdout.on('data', (data) => {
        jarOutput += data.toString('utf8');
      });
  
      javaProcess.stderr.on('data', (data) => {
        jarError += data.toString('utf8');
      });
  
      javaProcess.on('close', async (code) => {
        if (code === 0) {
          res.json({
            message: 'Arquivo compilado e salvo com sucesso.',
            path: filePath,
            content: jarOutput,
          });
        } else {
          console.error(`Erro do JAR: ${jarError}`);
          res.status(500).json({ message: 'Erro ao executar o JAR.', error: jarError });
        }
      });
    } catch (err: any) {
      console.error('Erro ao processar a requisição:', err);
      res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
  });

app.on("ready", async () => {
    mainWindow = await createWindow(storage, "main", false);

    if (app.isPackaged) {
        await mainWindow.loadURL("app://./home");
    } else {
        const devPort = process.argv[2] || port;
        await mainWindow.loadURL(`http://localhost:${devPort}/home`);
    }

    server.listen(port, () => {
        console.log(`Express server is running on http://localhost:${port}`);
    });

    mainWindow.show();
});

ipcMain.handle("open-file-dialog", async () => {
  const result = await dialog.showOpenDialog({
    title: "Abrir Arquivo",
    properties: ["openFile"],
    filters: [
      { name: "Text Files", extensions: ["txt"] },
    ],
  });

  return result.canceled ? [] : result.filePaths;
});

ipcMain.handle("save-file-dialog", async (event, defaultName) => {
  const result = await dialog.showSaveDialog({
    defaultPath: defaultName,
    filters: [{ name: "Text Files", extensions: ["txt"] }],
  });
  return result.filePath;
});

ipcMain.handle('get-app-is-packaged', () => {
  return app.isPackaged;
});

ipcMain.handle("create-writable", async (event, filePath) => {
  const writable = fs.createWriteStream(filePath, { flags: 'w' });
  return writable;
});


export {
  mainWindow, storage
};

