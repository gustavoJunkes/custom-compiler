"use client";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { ExclamationTriangleIcon, PlayIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [lines, setLines] = useState(1);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const numberOfLines = e.target.value.split('\n').length;
    setLines(numberOfLines);
  };

  const toggleConsole = () => {
    setIsConsoleVisible(!isConsoleVisible);
  };

  const callJava = async () => {
    try {
      debugger
      const response = await fetch('/api/call-java?method=method1');
      const data = await response.json();
      if (response.ok) {
        debugger
        setConsoleOutput(data.result);
      } else {
        debugger
        setConsoleOutput(`Erro: ${data.error}`);
      }
    } catch (err: any) {
      setConsoleOutput(`Erro na chamada API: ${err.message}`);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [lines]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Head>
        <title>Text Editor</title>
      </Head>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 p-2 rounded">IDE</div>
          <div className="flex space-x-2">
            <span className="cursor-pointer">Arquivo</span>
            <span className="cursor-pointer">Equipe</span>
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
          {/* Line Numbers */}
          <div className="bg-gray-900 text-gray-400 text-right pr-6 pl-6 overflow-hidden">
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-grow bg-gray-900 p-0 overflow-x-auto">
            <textarea
              ref={textAreaRef}
              className="w-full h-full bg-gray-900 text-white border-none outline-none resize-none leading-6 whitespace-nowrap overflow-y-hidden"
              onChange={handleInputChange}
              style={{ lineHeight: "1.5rem" }}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Static Console */}
      {isConsoleVisible && (
        <div className="bg-gray-800 p-2 overflow-auto" style={{ height: "200px" }}>
          <div className="text-sm">{consoleOutput || "Output console..."}</div>
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
