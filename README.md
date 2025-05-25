# Multi-Service Web Application Stack

This project demonstrates a multi-service web application architecture using Docker Compose to orchestrate separate containers for the frontend, backend API, database, and Redis cache. This setup showcases container communication and data persistence in a microservices-inspired approach.

## Overview

The application consists of the following services:

- **Frontend:** A user interface built with React, responsible for interacting with the user and consuming the backend API.
- **Backend API:** A Node.js/Express API handling business logic, data processing, and serving data to the frontend. It also interacts with the database and Redis cache.
- **Database:** A PostgreSQL database for persistent data storage.
- **Redis Cache:** An in-memory data store used by the backend API to cache frequently accessed data, improving performance.

Docker Compose is used to define and manage these services, their dependencies, networking, and volume management.

## Technologies Used

- **Frontend:** React
- **Backend API:** Node.js, Express
- **Database:** PostgreSQL
- **Cache:** Redis
- **Containerization & Orchestration:** Docker, Docker Compose

## Prerequisites

- **Docker:** Make sure you have Docker installed on your system. You can download it from the official [Docker website](https://www.docker.com/get-started).
- **Docker Compose:** Docker Compose is usually included with Docker Desktop. If you installed Docker Engine separately, you might need to install it separately as well.
- **Node.js and npm:** Ensure you have Node.js and npm (or yarn) installed on your development machine for potential local development or build processes.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/NonsoBarn/multi-service-app.git
cd multi-service-app
```

2. Start the application using Docker Compose:

```bash
docker-compose up -d --build
```

This command will:

- Build the Docker images for the frontend and backend if they haven't been built yet or if the Dockerfiles have changed.
- Create and start the containers for the frontend, backend, database, and Redis.
- Set up the necessary networking to allow the containers to communicate.
- Mount volumes for database data persistence.

3. Access the application:

- **Frontend:** Open your web browser and navigate to `http://localhost:3000`.
- The frontend will communicate with the backend API running within the Docker network.

## Development

If you want to make changes to the frontend or backend code and see them reflected during development, you might consider running the frontend using its development server (e.g., `npm start` in the `frontend` directory) and the backend similarly (e.g., `npm run dev` in the `backend` directory, if you've set up a development script with nodemon).

In this development workflow, you would typically _not_ run the frontend or backend services via Docker Compose. Instead, you would run the database and Redis services using Docker Compose to maintain the development environment parity.

### Example Development Workflow:

1. Start the database and Redis using Docker Compose:

```bash
docker-compose up -d db redis
```

2. Navigate to the frontend directory and start the development server:

```bash
cd frontend
npm start
```

The frontend development server will usually run on `http://localhost:3000` and will be configured (via the `proxy` setting in `frontend/package.json`) to forward API requests to your backend development server.

3. Navigate to the backend directory and start the development server (if configured):

```bash
cd ../backend
npm run dev
```

Your backend development server might run on `http://localhost:5000`. Ensure it's configured to connect to the Dockerized database and Redis (using `db` and `redis` as hostnames).

**Remember to stop the development servers and run `docker-compose up -d --build` in the root directory for the fully containerized production-like environment.**

## Key Concepts Demonstrated

- **Multi-Service Architecture:** Breaking down an application into independent, communicating services.
- **Containerization:** Using Docker to package each service and its dependencies into isolated containers.
- **Orchestration:** Employing Docker Compose to manage and link multiple containers.
- **Container Communication:** Demonstrating how containers on the same Docker network can communicate using their service names as hostnames.
- **Data Persistence:** Utilizing Docker volumes to persist the PostgreSQL database data.
- **Caching:** Implementing a basic caching layer with Redis to improve application performance.

## Next Steps and Potential Improvements

- **Implement actual database interaction:** Replace the simulated database fetching in the backend with a real connection to the PostgreSQL database container.
- **Add data modeling and migrations:** Define database schemas and use migration tools to manage database changes.
- **Implement more robust error handling and logging:** Improve error handling in both the frontend and backend and implement centralized logging.
- **Add unit and integration tests:** Write tests to ensure the reliability of each service and their interactions.
- **Explore scaling options:** Investigate how to scale individual services using Docker Compose or more advanced orchestration tools like Docker Swarm or Kubernetes.
- **Implement health checks:** Add health check endpoints to your services so that the orchestrator can monitor their status.
- **Secure the application:** Implement security best practices for containerized applications.

## Stopping the Application

To stop and remove the containers:

```bash
docker-compose down
```

To also remove the data volumes (including the PostgreSQL database data):

```bash
docker-compose down -v
```
