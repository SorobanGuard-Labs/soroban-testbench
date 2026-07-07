# Getting Started

Install dependencies and start the local Next.js server:

```bash
npm install
npm run dev
```

Then open http://localhost:3000/testbench.

Run quality checks before submitting changes:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Mock mode is enabled by default through `.env.example`.

## Using Docker

To ensure a consistent development environment for all contributors, Soroban Testbench supports a Docker-based local setup. This allows you to run the application without managing local Node.js or npm versions.

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed and running.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

## Running the Application

1. **Start the development container:**
   ```bash
   docker-compose up --build
   ```
The --build flag ensures your image dependencies match the current package.json.

1. Access the application:
Navigate to http://localhost:3000/testbench. Hot-reloading is fully supported.

### Managing the Environment
* Stop the server: Press `Ctrl + C` in the running terminal, or execute:

```bash
docker-compose down
```

* Run terminal commands inside the container:

```bash
docker exec -it soroban-testbench-dev sh
```

### Troubleshooting
* Hot-reloading is failing: Ensure WATCHPACK_POLLING=true is set in the docker-compose.yml file, which is required for certain OS environments like Windows/WSL.

* Dependency errors: If new packages were added to the repository, rebuild the image using docker-compose up --build.
