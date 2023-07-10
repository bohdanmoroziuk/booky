# Booky (booky)

This is a minimal example implementation of Clean Architecture in Vue/Quasar

## Module structure

```txt
bookmarks/
├── domain/
│   ├── entities
│   └── repositories
├── data/
│   └── repositories
├── application/
│   └── services
├── presentation/
│   ├── components
│   ├── containers
│   ├── controllers
│   ├── pages
│   ├── stores
│   └── routes.ts
└── index.ts
```

## Available scripts

### Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
npm run build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
