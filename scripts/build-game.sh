#!/bin/bash

# Script to build the Go game and copy WASM files to the portfolio
# Usage: ./scripts/build-game.sh

set -e

GAME_DIR="../bullets-go"
PORTFOLIO_GAME_DIR="./public/game"

echo "Building Go game for WebAssembly..."

# Build the WASM version
cd "$GAME_DIR"
make web || {
  # Fallback if Makefile doesn't work
  echo "Makefile failed, building manually..."
  mkdir -p build/web
  cp "$(go env GOROOT)/lib/wasm/wasm_exec.js" build/web/ 2>/dev/null || \
  cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" build/web/
  GOOS=js GOARCH=wasm go build -ldflags "-s -w" -o build/web/roguelike.wasm cmd/web/main.go
}

# Copy to portfolio
cd - > /dev/null
mkdir -p "$PORTFOLIO_GAME_DIR"
cp "$GAME_DIR/build/web/roguelike.wasm" "$PORTFOLIO_GAME_DIR/"
cp "$GAME_DIR/build/web/wasm_exec.js" "$PORTFOLIO_GAME_DIR/"

echo "✅ Game built and copied to $PORTFOLIO_GAME_DIR"
echo "Files:"
ls -lh "$PORTFOLIO_GAME_DIR"
