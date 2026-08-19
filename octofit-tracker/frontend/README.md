# OctoFit Tracker Frontend

The React 19 presentation tier uses `react-router-dom` for navigation and reads
the API location from Vite environment variables.

For a Codespaces API, create `octofit-tracker/frontend/.env.local` and define:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

`VITE_CODESPACE_NAME` must be defined for Codespaces. The app builds API URLs as
`https://<name>-8000.app.github.dev/api/<resource>/`. When it is unset, the
frontend safely falls back to `VITE_API_URL`, or `http://localhost:8000`.

## Development

```bash
npm install
npm run dev
```

## Original Vite Notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
