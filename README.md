# Calculator Microservice & CI/CD Pipeline

**Course:** Software Engineering / DevOps  
**Topic:** DevOps, Continuous Integration & Continuous Deployment (CI/CD) with GitHub Actions  
**Tech Stack:** Node.js, TypeScript, Express, Vitest, Supertest, Docker, GitHub Actions, Render  
**Total Points:** 20  

---

## Overview

In this assignment, you will step into a DevOps engineer role to build, test, and automate the deployment pipeline for a lightweight calculator microservice.

Modern engineering teams rely on automated pipelines to continuously validate code changes and safely deliver containerized software to production. You are starting with a starter repository containing the Express application scaffolding and placeholder endpoints.

Your task is divided into three key areas:
1. **API Implementation:** Complete the arithmetic endpoints with robust parameter handling and validation in TypeScript.
2. **Automated Testing:** Write integration tests using Vitest and Supertest covering happy paths and edge cases.
3. **CI/CD Automation:** Create GitHub Actions workflows from scratch to run tests on every branch push (CI) and automatically trigger deployments to Render via a deploy hook only when all tests pass on the `main` branch (CD).

---

## 🚀 Getting Started

### Prerequisites by Operating System

- **macOS:**
  - Install [Node.js](https://nodejs.org/) (v20+ or v24 LTS recommended, e.g., via `brew install node` or `nvm`).
- **Windows (WSL2):**
  - Run inside your **WSL2 terminal** (e.g., Ubuntu).
  - Install [Node.js](https://nodejs.org/) directly inside WSL2 using `nvm` or NodeSource.
- **Linux:**
  - Install [Node.js](https://nodejs.org/) (v20+ or v24 LTS).

---

### Step 1: Install Dependencies

From your terminal in the project root:

```bash
npm install
```

---

### Step 2: Start the Development Server

Start the Express server with hot-reloading:

```bash
npm run dev
```

The server listens on `http://localhost:3000`. Test the health check endpoint:

```bash
curl http://localhost:3000/health
```

---

### Step 3: Run the Automated Test Suite

Execute the test suite using Vitest:

```bash
npm test
```

Additional scripts:

- **Watch Mode for Tests:** `npm run test:watch`
- **Build TypeScript:** `npm run build`
- **Start Production Server:** `npm start`

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── test.yml          # CI: you will create this (runs tests on every branch push)
│       └── deploy.yml        # CD: you will create this (deploys to Render on main if tests pass)
├── src/
│   ├── app.ts                # Express app & route definitions (implement your endpoints here)
│   └── index.ts              # Server listener entry point (do not modify)
├── tests/
│   └── app.test.ts           # Vitest + Supertest integration tests (write your tests here)
├── Dockerfile                # Multi-stage production container build (provided)
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## Part 1: API Implementation (4 Points)

Open [`src/app.ts`](./src/app.ts). The `/health` endpoint is already implemented for you. Implement the four arithmetic endpoints under `/api/v1/`:

### Endpoints Specification

All endpoints are `GET` requests and accept two query parameters: `a` and `b`.

| Method | Endpoint | Query Parameters | Success Response (`200 OK`) |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | None | Status `200` (text or empty) |
| `GET` | `/api/v1/add` | `a`, `b` | `{ "result": a + b }` |
| `GET` | `/api/v1/subtract` | `a`, `b` | `{ "result": a - b }` |
| `GET` | `/api/v1/multiply` | `a`, `b` | `{ "result": a * b }` |
| `GET` | `/api/v1/divide` | `a`, `b` | `{ "result": a / b }` |

### Validation & Error Handling

- **Missing or Invalid Operands:** If `a` or `b` is missing, empty, or not a valid number (e.g., `?a=foo&b=2`), return `400 Bad Request` with:
  ```json
  { "error": "Invalid operands" }
  ```
- **Division by Zero:** For `/api/v1/divide`, if `b` is `0`, return `400 Bad Request` with:
  ```json
  { "error": "Division by zero" }
  ```

---

## Part 2: Integration Testing with Vitest & Supertest (4 Points)

Open [`tests/app.test.ts`](./tests/app.test.ts).

The test suite contains an example test for `GET /health` and `it.todo(...)` placeholders for the remaining routes. Replace each `it.todo(...)` with a full, passing integration test.

### Requirements

For each arithmetic route (`/add`, `/subtract`, `/multiply`, `/divide`), ensure you test:
1. **Happy Path:** Valid inputs produce status `200` and the correct numerical `{ result: <number> }`.
2. **Negative Numbers:** Handles negative values properly.
3. **Missing Operands:** Returns status `400` with `{ error: "Invalid operands" }` if an operand is omitted.
4. **Invalid Operands:** Returns status `400` with `{ error: "Invalid operands" }` if non-numeric characters are supplied.
5. **Division by Zero (Divide only):** Returns status `400` with `{ error: "Division by zero" }` when `b=0`.

Example Supertest call with query parameters:

```ts
const res = await request.get('/api/v1/add').query({ a: '10', b: '5' });
expect(res.statusCode).toEqual(200);
expect(res.body).toEqual({ result: 15 });
```

---

## Part 3: GitHub Actions CI/CD & Render Deployment (12 Points)

You must create two GitHub Actions workflow files inside the `.github/workflows/` directory.

### 1. Continuous Integration Workflow (`.github/workflows/test.yml`)

Create `.github/workflows/test.yml` to automatically run tests on every push to any branch.

**Requirements:**
- Trigger on `push` to all branches (`branches: ['**']`).
- Run on `ubuntu-latest`.
- Steps must:
  1. Check out code using `actions/checkout@v4`.
  2. Set up Node.js (version 20 or 22) using `actions/setup-node@v4` with npm caching (`cache: 'npm'`).
  3. Install dependencies using `npm ci`.
  4. Run tests with `npm test`.

### 2. Setting Up Your Web Service on Render (Docker)

1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Render will automatically detect the [`Dockerfile`](./Dockerfile) in the repository root:
   - **Environment:** Docker
   - **Auto-Deploy:** Set to **No** (disabled). We want GitHub Actions to control deployments!
5. Deploy the initial service and ensure it starts cleanly.

### 3. Continuous Deployment Workflow (`.github/workflows/deploy.yml`)

1. In your Render service dashboard, navigate to **Settings → Deploy Hook**.
2. Copy your unique **Deploy Hook URL**.
3. In your GitHub repository:
   - Go to **Settings → Secrets and variables → Actions**.
   - Create a repository secret named `RENDER_DEPLOY_HOOK_URL`.
   - Paste the Render deploy hook URL as the secret value.
4. Create `.github/workflows/deploy.yml`:
   - Trigger on `push` to the `main` branch only.
   - Define two jobs:
     1. A `test` job that checks out code, installs dependencies, and runs `npm test`.
     2. A `deploy` job that specifies `needs: test` to guarantee deployment **only happens if the test job succeeds**.
   - The deploy job runs `curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK_URL }}"` to trigger the Render deployment hook.

> [!CAUTION]
> Never hardcode or commit your Render deploy hook URL into your repository files. Always store it in GitHub Repository Secrets.

---

## Grading Rubric

### Total Points: 20

| Category | Points | Description |
| :--- | :---: | :--- |
| **API Endpoints (`src/app.ts`)** | **4** | Correct implementation of `/add`, `/subtract`, `/multiply`, and `/divide` returning expected JSON format (2 pts). Proper error handling for missing/non-numeric operands and division by zero returning status `400` (2 pts). |
| **Integration Testing (`tests/app.test.ts`)** | **4** | Comprehensive Vitest + Supertest suite converting all `it.todo` stubs into passing tests (2 pts). Covers valid inputs, negatives, invalid types, and edge cases (2 pts). |
| **Continuous Integration (`test.yml`)** | **6** | Correctly created `.github/workflows/test.yml` triggering on push to any branch (`**`), checking out code, setting up Node.js with caching, installing dependencies with `npm ci`, and running `npm test`. |
| **Continuous Deployment (`deploy.yml` & Render)** | **6** | Correctly created `.github/workflows/deploy.yml` triggering on `main`, enforcing `needs: test` to guarantee deployment only occurs when tests pass, securely using `RENDER_DEPLOY_HOOK_URL`, and successfully triggering Render Docker deployment. |
