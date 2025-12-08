"use client";

import { useEffect } from "react";

export default function GamePage() {
  useEffect(() => {
    // Load the WASM game
    const loadGame = async () => {
      // @ts-ignore - Go is loaded from wasm_exec.js
      const go = new Go();

      try {
        const wasmModule = await WebAssembly.instantiateStreaming(fetch("/game/roguelike.wasm"), go.importObject);
        go.run(wasmModule.instance);
      } catch (error) {
        console.error("Failed to load game:", error);
      }
    };

    // Load wasm_exec.js first
    const script = document.createElement("script");
    script.src = "/game/wasm_exec.js";
    script.onload = () => {
      loadGame();
    };
    script.onerror = (error) => {
      console.error("Failed to load wasm_exec.js:", error);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-2xl mb-4">Bullet Heaven Game</h1>
        <div
          id="game-container"
          className="flex justify-center"
        >
          <canvas id="gameCanvas"></canvas>
        </div>
        <p className="text-gray-400 mt-4 text-sm">Controls: WASD/Arrow Keys to move, ESC to pause</p>
      </div>
    </div>
  );
}
