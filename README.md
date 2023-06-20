# Find Friend API

The Find Friend API is designed to assist users in finding and adopting pets. This API enables organizations to add pets that are available for adoption, and users can easily search for pets based on their preferred city.

## Technologies

- [Fastify](https://www.fastify.io/docs/latest)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PrismaORM](https://www.prisma.io/docs/)
- [Vitest](https://vitest.dev/)

## Development Principles

- TDD
- SOLID
- REST

## Installation

To install and run the Find Friend API locally, follow these steps:

Clone this repo:

```bash
git clone https://github.com/PedroHercules/find-friend-api.git
```

Install dependencies:

```bash
npm install
```

## Usage

Before running the API, make sure you have Docker and Docker Compose installed on your machine. You can find installation instructions in the [Docker documentation](https://docs.docker.com/get-docker/).

To launch the PostgreSQL database container:

```bash
docker-compose -f docker-compose-database.yml up -d
```

To run migration in development mode:
```bash
npx prisma migrate dev
```

To run migration in production mode:
```bash
npx prisma migrate deploy
```

To launch the application server in development mode:

```bash
npm run dev
```

To build the code in Javascript:

```bash
tsup src --out-dir build
```

To launch the application server in production mode:

```bash
npm start
```

## Tests

The Find Friend API includes unit tests and end-to-end (E2E) tests.

To run the unit tests:

```bash
npm run test:unit
```

To run the unit tests in watch mode:

```bash
npm run test:unit:watch
```

Before running the E2E tests, you need to preinstall the test environment by running the following command:

```bash
npm run test:e2e
```

After that, you can run the E2E tests in watch mode:

```bash
npm run test:e2e:watch
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
