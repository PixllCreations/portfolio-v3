# Game Demo Setup

The Bullet Heaven game is hosted directly in this portfolio repository as a WebAssembly (WASM) demo.

## Current Setup

- **WASM files**: Located in `public/game/`
  - `roguelike.wasm` - The compiled game
  - `wasm_exec.js` - Go's WebAssembly runtime
- **Game page**: `/app/game/page.tsx` - Next.js page that loads and runs the WASM game
- **Access**: Click the "Bullet Heaven Game" project card to play

## Rebuilding the Game

When you update the game code, rebuild and copy the WASM files:

```bash
# Option 1: Use the build script
./scripts/build-game.sh

# Option 2: Manual build
cd ../bullets-go
make web
# Then copy build/web/* to public/game/
```

## Important Notes

### Assets

The game currently uses `SetBasePath("assets")` which tries to read from the filesystem. For WASM to work properly in the browser, you have two options:

1. **Embed assets in WASM** (Recommended):
   - Update the game code to use Go's `embed` package
   - Modify `cmd/web/main.go` to embed assets and pass to `assetManager.SetEmbedFS()`
   - This bundles everything into the WASM binary

2. **Serve assets via HTTP**:
   - Copy the `assets/` folder to `public/game/assets/`
   - Update asset paths to use relative URLs
   - Less efficient but easier for development

### Current Status

The game WASM is built and ready, but assets may need to be embedded or served separately for full functionality. Test the game at `/game` to see what works.

## Troubleshooting

- **Game doesn't load**: Check browser console for errors
- **Assets missing**: See "Assets" section above
- **WASM errors**: Ensure `wasm_exec.js` is from the same Go version used to build
