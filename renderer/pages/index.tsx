"use client";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { ExclamationTriangleIcon, PlayIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [lines, setLines] = useState(1);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const lineNumbersRef = useRef<HTMLDivElement>(null);

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
    }
  };

  const copy = () => {
    const selection = window.getSelection();
    const text = selection ? selection.toString() : '';
    // Implement copy functionality if needed
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (textAreaRef.current) {
          const content = e.target?.result as string;
          textAreaRef.current.value = content;
          const numberOfLines = content.split('\n').length;
          setLines(numberOfLines);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Erro ao abrir o arquivo. Por favor, selecione um arquivo de texto.');
    }

    event.target.value = '';
  };

  const toggleConsole = () => {
    setIsConsoleVisible(!isConsoleVisible);
  };

  const callJava = async () => {
    try {
      const response = await fetch('/api/call-java?method=method1');
      const data = await response.json();
      if (response.ok) {
        setConsoleOutput(data.result);
      } else {
        setConsoleOutput(`Erro: ${data.error}`);
      }
    } catch (err: any) {
      setConsoleOutput(`Erro na chamada API: ${err.message}`);
    }
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

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Head>
        <title>Text Editor</title>
      </Head>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 p-2 rounded">IDE</div>
          <div className="flex space-x-4">
            <span onClick={newFile} className="cursor-pointer">Novo[Ctrl N]</span>
            <button onClick={openFile} className="cursor-pointer">Abrir [Ctrl O]</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".txt"
              onChange={handleFileChange}
            />
            <span className="cursor-pointer">Salvar [Ctrl S]</span>
            <span onClick={copy} className="cursor-pointer">Copiar [Ctrl C]</span>
            <span onClick={copy} className="cursor-pointer">Colar [Ctrl V]</span>
            <span onClick={copy} className="cursor-pointer">Recortar [Ctrl X]</span>
            <span className="cursor-pointer">Compilar [F7]</span>
            <span className="cursor-pointer">Equipe [F1]</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-20 bg-gray-800 flex flex-col items-center py-4 space-y-4">
          <PlayIcon onClick={callJava} className="h-8 w-8 text-gray-400 cursor-pointer hover:text-white" />
          <ExclamationTriangleIcon onClick={toggleConsole} className="h-8 w-8 text-gray-400 cursor-pointer hover:text-white" />
        </div>

        {/* Editor and Line Numbers */}
        <div className="flex flex-grow overflow-hidden">
          {/* Container for Line Numbers and Textarea */}
          <div className="flex w-full overflow-hidden">
            {/* Line Numbers */}
            <div
              ref={lineNumbersRef}
              className="bg-gray-900 text-gray-400 text-right pr-12 pl-6"
              style={{ width: '3em', position: 'relative' }}
            >
              {/* Container to handle scroll */}
              <div className="h-full">
                {Array.from({ length: lines }, (_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div className="flex-grow bg-gray-900 p-0 overflow-hidden">
              <textarea
                ref={textAreaRef}
                className="w-full h-full bg-gray-900 text-white border-none outline-none resize-none leading-6 whitespace-nowrap"
                onChange={handleInputChange}
                onScroll={handleScroll}
                rows={10}
                cols={50}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Static Console */}
      {isConsoleVisible && (
        <div className="bg-gray-800 p-2 overflow-auto" style={{ height: "200px" }}>
          <div className="text-sm">{consoleOutput}</div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>Jessé</span>
          <span>Gabriel</span>
          <span>Gustavo</span>
        </div>
        <div className="text-sm">Ln 1, Col 1</div>
      </div>
    </div>
  );
}
