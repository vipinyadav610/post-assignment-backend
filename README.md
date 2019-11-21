# Express Boilerplate

Starter Project for building RESTful APIs and microservices using Node.js.

## Features

- ES2017 latest features like Async/Await
- CORS enabled
- Uses [yarn](https://yarnpkg.com)
- Express + Postgresql ([Postgresql](https://www.postgresql.org/))
- Consistent coding styles with [editorconfig](http://editorconfig.org)
- Load environment variables from .env files with [dotenv](https://www.npmjs.com/package/dotenv)
- Request validation with [joi](https://www.npmjs.com/package/joi)
- Linting with [eslint](http://eslint.org)
- API documentation generation with [swagger](https://swagger.io/)

## Requirements

- [Node v7.6+](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/en/docs/install)

### Swagger Link:

```bash
http://localhost:3005/api-docs

```

## Getting Started

#### Clone the repo :

```bash
git clone  https://github.com/vipinyadav610/post-assignment-backend.git
cd post-assignment-backend

```

#### Install dependencies:

```bash
yarn
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn start
```

## Build For Production

```bash
yarn build
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## License

[MIT License](README.md)
