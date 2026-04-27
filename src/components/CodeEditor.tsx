"use client";

import { useState, useCallback } from "react";

interface CodeEditorProps {
  initialCode?: string;
  readOnly?: boolean;
}

export default function CodeEditor({ initialCode = "// Write your code here\nconsole.log(\"Hello, World!\");", readOnly = false }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setError(null);
    setOutput([]);

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: unknown[]) => {
            logs.push(args.map(arg => 
              typeof arg === "object" ? JSON.stringify(arg) : String(arg)
            ).join(" "));
          },
          error: (...args: unknown[]) => {
            logs.push("Error: " + args.map(arg => String(arg)).join(" "));
          },
          warn: (...args: unknown[]) => {
            logs.push("Warning: " + args.map(arg => String(arg)).join(" "));
          }
        };

        const fn = new Function("console", code);
        fn(mockConsole);

        if (logs.length === 0) {
          logs.push("(No output)");
        }
        setOutput(logs);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsRunning(false);
      }
    }, 300);
  }, [code]);

  const lineNumbers = code.split("\n").length;

  return (
    <div className="bg-[#12121a] rounded-xl overflow-hidden border border-[#2e2e3a]">
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a24] border-b border-[#2e2e3a]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f87171]" />
          <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
          <div className="w-3 h-3 rounded-full bg-[#34d399]" />
        </div>
        <span className="text-sm text-[#64748b] font-mono">script.js</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr]">
        <div className="hidden lg:block bg-[#0a0a0f] border-r border-[#2e2e3a] py-4 px-2 text-right">
          {Array.from({ length: lineNumbers }, (_, i) => (
            <div key={i} className="text-sm text-[#64748b] font-mono leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => !readOnly && setCode(e.target.value)}
            readOnly={readOnly}
            className="w-full h-64 lg:h-auto min-h-[256px] bg-transparent px-4 py-4 text-sm font-mono text-[#f8fafc] leading-6 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a24] border-t border-[#2e2e3a]">
        <span className="text-sm text-[#64748b]">JavaScript</span>
        <button
          onClick={runCode}
          disabled={isRunning || readOnly}
          className="px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {isRunning ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Running...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Run Code
            </>
          )}
        </button>
      </div>

      {output.length > 0 && (
        <div className="border-t border-[#2e2e3a]">
          <div className="px-4 py-2 bg-[#1a1a24] text-sm text-[#94a3b8]">Output</div>
          <div className="px-4 py-3 space-y-1 max-h-40 overflow-y-auto">
            {output.map((line, i) => (
              <div key={i} className="text-sm font-mono text-[#22d3ee]">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="border-t border-[#2e2e3a]">
          <div className="px-4 py-2 bg-[#1a1a24] text-sm text-[#f87171]">Error</div>
          <div className="px-4 py-3">
            <pre className="text-sm font-mono text-[#f87171] whitespace-pre-wrap">{error}</pre>
          </div>
        </div>
      )}
    </div>
  );
}