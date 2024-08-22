"use client";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { ClipboardDocumentIcon, ClipboardIcon, CodeBracketIcon, DocumentIcon, ExclamationTriangleIcon, PlayIcon, ScissorsIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [lines, setLines] = useState(1);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);
  const [currentFileHandle, setCurrentFileHandle] = useState<FileSystemFileHandle | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const numberOfLines = e.target.value.split('\n').length;
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
    setConsoleOutput('Integrantes: Jessé Antônio Effting Serpa, Gustavo Henrique Junkes, Gabriel Borba');
  }

  const saveFile = async () => {
    if (currentFileHandle) {
      try {
        const writable = await currentFileHandle.createWritable();
        await writable.write(textAreaRef.current!.value);
        await writable.close();
        setConsoleOutput('Arquivo salvo com sucesso.');
      } catch (err) {
        setConsoleOutput('Erro ao salvar o arquivo.');
      }
    } else {
      // Salvar como um novo arquivo
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: 'novo_arquivo.txt',
        types: [{
          description: 'Text Files',
          accept: { 'text/plain': ['.txt'] }
        }]
      });
      const writable = await fileHandle.createWritable();
      await writable.write(textAreaRef.current!.value);
      await writable.close();
      setCurrentFileHandle(fileHandle);
      setCurrentFileName(fileHandle.name);
      setConsoleOutput('Arquivo salvo com sucesso.');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === 'text/plain') {
      const fileHandle = await window.showOpenFilePicker({
        types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
      }).then((fileHandles: any) => fileHandles[0]);

      setCurrentFileHandle(fileHandle);
      setCurrentFileName(file.name);

      const content = await file.text();
      if (textAreaRef.current) {
        textAreaRef.current.value = content;
        const numberOfLines = content.split('\n').length;
        setLines(numberOfLines);
      }
    } else {
      alert('Erro ao abrir o arquivo. Por favor, selecione um arquivo de texto.');
    }

    event.target.value = '';
  };

  const toggleConsole = () => {
    setIsConsoleVisible(!isConsoleVisible);
  };

  const compile = async () => {
    setConsoleOutput("Compilação de programas ainda não foi implementada"); 
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [lines]);

  const handleScroll = () => {
    if (lineNumbersRef.current && textAreaRef.current) {
      lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
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
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
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
            <div className="flex items-center space-x-1 cursor-pointer" onClick={openFile}>
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
      <div className="flex flex-grow overflow-hidden">
        

        {/* Editor and Line Numbers */}
        <div className="flex flex-grow relative">
          {/* Line Numbers */}
          <div
            ref={lineNumbersRef}
            className="bg-gray-900 text-gray-400 text-right pr-4 pt-1 absolute top-0 bottom-0 left-0"
            style={{ width: '4rem', overflowY: 'hidden', pointerEvents: 'none' }}
          >
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-grow ml-16">
            <textarea
              ref={textAreaRef}
              className="w-full h-full bg-gray-900 text-white border-none outline-none resize-none leading-6 whitespace-nowrap overflow-y-auto"
              onChange={handleInputChange}
              onScroll={handleScroll}
              rows={10}
              cols={50}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Static Console */}
      {true && (
        <div className="bg-gray-800 p-2 overflow-auto" style={{ height: "200px" }}>
          <div className="text-sm">{consoleOutput}</div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        
        <div className="text-sm">Arquivo: {currentFileName || "Novo"} </div>
        <div className="text-sm">Linhas: {lines}</div>
      </div>
    </div>
  );
}
