import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const method = url.searchParams.get('method');

  if (!method) {
    return NextResponse.json({ error: 'Método não encontrado' }, { status: 400 });
  }

  const jarPath = path.resolve(process.cwd(), 'app/teste.jar');

  return new Promise((resolve) => {
    const javaProcess = spawn('java', ['-jar', jarPath, method]);

    let output = '';

    javaProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    javaProcess.stderr.on('data', (data) => {
      resolve(NextResponse.json({ error: data.toString() }, { status: 500 }));
    });

    javaProcess.on('close', (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ result: output.trim() }));
      } else {
        resolve(NextResponse.json({ error: `Processo Java finalizado com código ${code}` }, { status: 500 }));
      }
    });
  });
}
