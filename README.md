# Radix Challenge

## Overview

This project is a web application built using **Next.js** for the frontend, **Prisma** for database management, and **PostgreSQL** hosted on **AWS** for the database. The project also integrates **Chart.js** and **react-chartjs-2** for data visualization. This README provides detailed instructions on setting up the development environment, configuring the database, and deploying the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Database Management](#database-management)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Lib Documentation](#documentation)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **Yarn**
- **PostgreSQL** (for local development or access to AWS RDS)
- **AWS CLI** (optional, for managing AWS resources from the command line)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Roma1-Trindade/radix-challenge.git
cd radix-challenge
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of your project. Copy and paste the following template and fill in the required values:

```
# Prisma Environment Variables
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
JWT_SECRET=""
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials. For local development, you can use a local PostgreSQL instance or an AWS RDS instance.

### 4. Prisma Setup

Run the following commands to generate Prisma client and set up the database schema:

```bash
npx prisma generate
npx prisma migrate dev
```

If you have existing migrations, you can run:

```bash
npx prisma migrate deploy
```

If you already change .env file with a valid DATABASE_URL, you can run:

```bash
npx prisma db push
```

## Configuration

### 1. Next.js Configuration

Next.js configuration is managed through `next.config.js`. Customize this file to add additional settings or environment variables as needed.

### 2. Prisma Configuration

Prisma configuration is found in `prisma/schema.prisma`. Update this file to manage your data models and relationships.

## Development

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000`.

### Code Formatting

Ensure your code adheres to formatting standards by using Prettier. You can format your code by running:

```bash
npm run format
# or
yarn format
```

### Linting

To lint your code, use ESLint:

```bash
npm run lint
# or
yarn lint
```

## Deployment

### Deploying to Vercel

1. **Create a Vercel Account**: If you don't have one, sign up at [Vercel](https://vercel.com/).
2. **Connect Your Repository**: Import your project repository into Vercel.
3. **Set Environment Variables**: Configure environment variables in Vercel's dashboard to match those in your `.env` file.
4. **Deploy**: Vercel will automatically build and deploy your application on each push to the main branch.

## Database Management

### Migrations

Run migrations to apply schema changes:

```bash
npx prisma migrate dev
```

For production environments:

```bash
npx prisma migrate deploy
```

### Seeding the Database

To seed the database with initial data, create a `prisma/seed.ts` file and run:

```bash
npx tsx prisma/seed.ts
```

### Database Connection

Ensure your database connection string in `.env` is correctly configured to connect to your PostgreSQL instance.

## Scripts

- **Development**: `npm run dev` or `yarn dev`
- **Build**: `npm run build` or `yarn build`
- **Start**: `npm run start` or `yarn start`
- **Lint**: `npm run lint` or `yarn lint`
- **Format**: `npm run format` or `yarn format`

## Contributing

We welcome contributions to this project! Please follow these steps:

1. **Fork the Repository**
2. **Create a Branch**: `git checkout -b feature/your-feature`
3. **Make Your Changes**
4. **Commit Your Changes**: `git commit -m 'Add your message here'`
5. **Push to Your Fork**: `git push origin feature/your-feature`
6. **Create a Pull Request**

Please ensure your code adheres to the project's coding standards and passes all tests.

## License

## Documentation

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

To learn more about Prisma, take a look at the following resources:

- [Prisma Documentation](https://www.prisma.io/docs/getting-started) - learn about Prisma.io features
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)

```
Feel free to adjust the README based on the specifics of your project and team preferences.
```
