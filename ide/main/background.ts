import type { BrowserWindow } from "electron";
import { app } from "electron";
import serve from "electron-serve";

import createWindow from "@main/lib/helpers/createWindow";
import StorageService from "@main/lib/helpers/storageService";
import express from 'express';
import cors from 'cors';
import { spawn } from "child_process";

if (app.isPackaged) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

const storage = new StorageService();

let mainWindow: BrowserWindow;

const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());

server.post('/compile', (req: any, res: any) => {
    const { content } = req.body;
    const jarPath = 'main/compiler-backend.jar';

    const javaProcess = spawn('java', ['-Dfile.encoding=UTF-8', '-jar', jarPath, content]);

    javaProcess.stdout.on('data', (data) => {
        const output = data.toString('utf8');
        console.log(`Saída do JAR: ${output}`);
        res.write(output);
    });

    javaProcess.stderr.on('data', (data) => {
        const error = data.toString('utf8');
        console.error(`Erro do JAR: ${error}`);
        res.status(500).send(`Erro ao executar o JAR: ${error}`);
    });

    javaProcess.on('close', (code) => {
        console.log(`Processo Java encerrado com código ${code}`);
        res.end();
    });
});

app.on("ready", async () => {
    mainWindow = await createWindow(storage, "main", false);

    if (app.isPackaged) {
        await mainWindow.loadURL("app://./home");
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
    }

    server.listen(3000, () => {
        console.log(`Express server is running on http://localhost:${port}`);
    });

    mainWindow.show();
});

export {
    storage,
    mainWindow
};
