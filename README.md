# Radix Challenge

## Overview

![image](https://github.com/Roma1-Trindade/radix/assets/61998570/e77484ca-642b-4922-a8af-8fd6d139852a)

This project is a web application built using **Next.js** for the frontend, **Prisma** for database management, and **PostgreSQL** hosted on **AWS** for the database. The project also integrates **Chart.js** and **react-chartjs-2** for data visualization. This README provides detailed instructions on setting up the development environment, configuring the database, and deploying the application.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Roma1-Trindade/radix-challenge.git
cd radix-challenge
```

### 2. Install Dependencies

#### Make sure you have Node.js version 18 or higher installed:

```bash
node -v
```

```bash
npm install
# or
yarn install
```

## Development

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000`.

## Create an account or access with

- email: admin@prisma.io
- password: admin@prisma.io

## Endpoints

### Auth

- POST: http://localhost:3000/api/auth/login - Sign in with credentials
- POST: http://localhost:3000/api/auth/register - Sign up with credentials

![image](https://github.com/Roma1-Trindade/radix/assets/61998570/c4f87f63-7ceb-45ff-82e5-07bd14855ff1)

### Auth token

Add bearer token in the authentication header as such:

```bash
[Authentication] = Bearer <token>
```

![image](https://github.com/Roma1-Trindade/radix/assets/61998570/91405348-30a3-4e1d-9099-d62d0a33a1d5)

### Sensor data

- GET: http://localhost:3000/api/sensor-data - get all sensor data

### Upload data

- POST: http://localhost:3000/api/sensor-data - upload json
- POST: http://localhost:3000/api/sensor-data/upload - upload .csv file

## Load tests with simultaneous requests in a scenario of:

### 500:

```bash
cd load-test
results-500.html #HTML file
results-500.json #JSON file
```

### 1000:

```bash
cd load-test
results-1000.html #HTML file
results-1000.json #JSON file
```

### 5000:

```bash
cd load-test

results-5000.html #HTML file
results-5000.json #JSON file
```

### 10000:

```bash
cd load-test

results-10000.html #HTML file
results-10000.json #JSON file
```
