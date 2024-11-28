// @ts-nocheck
"use client";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { ClipboardDocumentIcon, ClipboardIcon, CodeBracketIcon, DocumentIcon, ScissorsIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [lines, setLines] = useState(1);
  const [consoleHeight, setConsoleHeight] = useState(200);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);
  const [currentFileHandle, setCurrentFileHandle] = useState<FileSystemFileHandle | null>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const numberOfLines = e.target.value.split("\n").length;
    setLines(numberOfLines);
  };

  const openFile = () => {
    fileInputRef?.current?.click();
  };

  const newFile = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
      setLines(1);
      setConsoleOutput('');
      setCurrentFileName(null);
      setCurrentFileHandle(null);
    }
  };

  const copy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      document.execCommand('copy');
    }
  };

  const cut = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      document.execCommand('cut');
      setLines(textAreaRef.current.value.split('\n').length);
    }
  };

  const paste = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      document.execCommand('paste');
      setLines(textAreaRef.current.value.split('\n').length);
    }
  };

  const showTeam = () => {
    setConsoleOutput('Integrantes: Jessé Antônio Effting Serpa, Gustavo Henrique Junkes, Gabriel de Borba');
  }

  const saveFile = async () => {
    if (currentFileHandle && currentFileName !== "Novo") {
      try {
        const filePath = currentFileHandle.path;
  
        window.electronAPI.writeFile(filePath, textAreaRef.current!.value);
  
        setConsoleOutput('Arquivo salvo com sucesso.');
      } catch (err) {
        setConsoleOutput('Erro ao salvar o arquivo.');
        console.error('Erro ao salvar arquivo:', err);
      }
    } else {
      try {
        const filePath = await window.electronAPI.saveFileDialog("novo_arquivo.txt");
  
        if (filePath) {
          window.electronAPI.writeFile(filePath, textAreaRef.current!.value);
  
          setCurrentFileHandle({ path: filePath } as FileSystemFileHandle);
          setCurrentFileName(filePath.split("\\").pop()!);
          setConsoleOutput('Arquivo salvo com sucesso.');
        } else {
          setConsoleOutput('Nenhum arquivo foi selecionado.');
        }
      } catch (err) {
        setConsoleOutput('Erro ao salvar o arquivo.');
      }
    }
  };
  
  

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = async () => {
    if (isDialogOpen) return;

    setIsDialogOpen(true);

    try {
      const filePaths = await window.electronAPI.openFileDialog();

      if (filePaths && filePaths.length > 0) {
        const filePath = filePaths[0];

        const content = await window.electronAPI.readFile(filePath);

        setCurrentFileHandle({ path: filePath } as FileSystemFileHandle);
        setCurrentFileName(filePath.split("\\").pop()!);
        if (textAreaRef.current) {
          textAreaRef.current.value = content;
          const numberOfLines = content.split("\n").length;
          setLines(numberOfLines);
        }
      } else {
        alert("Nenhum arquivo selecionado.");
      }
    } catch (error) {
      alert("Erro ao abrir o arquivo: " + error.message);
    } finally {
      setIsDialogOpen(false);
    }
  };




  const compile = async () => {
    setConsoleOutput("Compilando...");

    if (currentFileName == null || currentFileName == "Novo") {
      setConsoleOutput("Somente é possível compilar arquivos salvos.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: [currentFileHandle.path, textAreaRef.current.value],
        })
      });
      const result = await response.text();
      const convertedResult = JSON.parse(result);
      setConsoleOutput(`${convertedResult.content}`);
    } catch (error) {
      setConsoleOutput(`Erro ao chamar a API: ${error.message}`);
    }
  };
  

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
  };

  const resize = (e: MouseEvent) => {
    const newHeight = window.innerHeight - e.clientY - 20;
    setConsoleHeight(newHeight);
  };

  const stopResizing = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResizing);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (true) {
        case (event.ctrlKey && event.key === 'o'):
          event.preventDefault();
          openFile();
          break;
        case (event.ctrlKey && event.key === 'n'):
          event.preventDefault();
          newFile();
          break;
        case (event.ctrlKey && event.key === 's'):
          event.preventDefault();
          saveFile();
          break;
        case (event.key === 'F1'):
          event.preventDefault();
          showTeam();
          break;
        case (event.key === 'F7'):
          event.preventDefault();
          compile();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Head>
        <title>Text Editor</title>
      </Head>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 p-2 rounded">IDE</div>
          <div className="flex space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer" onClick={newFile}>
              <DocumentIcon className="h-5 w-5" />
              <span>Novo</span>
              <span className="text-xs">[Ctrl N]</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={handleFileChange}>
              <DocumentIcon className="h-5 w-5" />
              <span>Abrir</span>
              <span className="text-xs">[Ctrl O]</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".txt"
              onChange={handleFileChange}
            />
            <div className="flex items-center space-x-1 cursor-pointer" onClick={saveFile}>
              <DocumentIcon className="h-5 w-5" />
              <span>Salvar</span>
              <span className="text-xs">[Ctrl S]</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={copy}>
              <ClipboardDocumentIcon className="h-5 w-5" />
              <span>Copiar</span>
              <span className="text-xs">[Ctrl C]</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={paste}>
              <ClipboardIcon className="h-5 w-5" />
              <span>Colar</span>
              <span className="text-xs">[Ctrl V]</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={cut}>
              <ScissorsIcon className="h-5 w-5" />
              <span>Recortar</span>
              <span className="text-xs">[Ctrl X]</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={compile}>
              <CodeBracketIcon className="h-5 w-5" />
              <span>Compilar</span>
              <span className="text-xs">[F7]</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={showTeam}>
              <UserGroupIcon className="h-5 w-5" />
              <span>Equipe</span>
              <span className="text-xs">[F1]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow relative overflow-hidden">
        {/* Editor Container */}
        <div className="relative flex-grow overflow-hidden">
          {/* Line Numbers */}
          <div
            className="bg-gray-900 text-gray-400 text-right pr-4 pt-1 absolute top-0 bottom-0 left-0"
            style={{ overflow: 'hidden', width: '3%' }}
          >
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Editor */}
          <textarea
            ref={textAreaRef}
            className="w-full h-full bg-gray-900 text-white border-none outline-none resize-none leading-6 whitespace-nowrap"
            onChange={handleInputChange}
            onScroll={(e) => {
              const target = e.target as HTMLTextAreaElement;
              document.querySelector('.bg-gray-900.text-gray-400.text-right')!.scrollTop = target.scrollTop;
            }}
            style={{ marginLeft: '3%', overflowX: 'auto', maxWidth: '97%' }}
          ></textarea>
        </div>
      </div>

      {/* Resizing Bar */}
      <div
        ref={resizeRef}
        className="w-full bg-gray-700 hover:bg-gray-600 cursor-row-resize"
        style={{ height: '10px', marginBottom: '2px' }}
        onMouseDown={startResizing}
      ></div>

      {/* Resizable Console */}
      <div
        className="bg-gray-800 p-2 overflow-auto"
        style={{
          height: `${consoleHeight}px`,
          minHeight: '4%',
          maxHeight: '45%',
          resize: "vertical",
          overflow: "auto"
        }}
      >
        <div className="text-sm h-[calc(100vh-4%)] overflow-y-auto">
          <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="bg-gray-800 px-4 py-2 flex items-center justify-between"
        style={{
          position: "fixed",
          minHeight: '4%',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div className="text-sm">Arquivo: {currentFileName || "Novo"}</div>
        <div className="text-sm">Linhas: {lines}</div>
      </div>
    </div>
  );
}
