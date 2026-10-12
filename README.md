# Intervue_Coder

Electron desktop shell with React renderer for technical interview assistance.

## Why this exists

Local-first desktop tools need a clear split between main process, renderer, and shared
types. This repo documents that layout for maintainers.

## Features

- Vite + Electron dev workflow
- Vitest unit tests and ESLint
- Production packaging via electron-builder

## Install

```bash
git clone https://github.com/HackerX-offical/Intervue_Coder.git
cd Intervue_Coder
npm install
```

## Quick start

```bash
npm run dev
```

## Output

Desktop window UI; build artifacts under `dist/` and `dist-electron/`.

## Develop

```bash
npm test
npm run format:check
npm run build
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for module layout and extension points.

## Ethics

Use only on systems and content you are **authorized** to test. See
[SECURITY.md](./SECURITY.md).

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
