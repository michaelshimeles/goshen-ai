# Goshen AI - AI Inference Platform

An AI inference platform (similar to fal.ai or Replicate) that lets users access image and video generation models through a simple API. Currently in MVP stage, designed to run locally on a single GPU (scalable to multiple GPUs later).

## 🧠 Project Goal

Create a production-ready, developer-friendly service for hosting and running inference on multiple AI models. Developers can generate media through API keys, while authenticated users (admins) can manage models, jobs, and API keys via a dashboard.

## ⚙️ Tech Stack

* **Frontend & Dashboard:** Next.js 15 + shadcn/ui + React Server Components
* **Backend:** Elysia (Bun) — serves internal compute and /v1 API routes
* **Auth:** WorkOS (via @workos-inc/authkit-nextjs) with global middleware protection
* **Database:** PostgreSQL (Neon → PlanetScale when scaling) with Drizzle ORM
* **Cache / Queue:** Redis (Railway) for background jobs, queueing, and rate-limiting
* **Storage:** S3/R2 for artifacts (images/videos)
* **Infra:** RunPod.io for GPU inference nodes (local for MVP, distributed later)
* **Schema / Contracts:** Shared package with zod + Drizzle types

---

## ✅ What's Been Implemented

### Infrastructure & Setup
* ✅ Monorepo structure with pnpm workspace (apps, packages, services)
* ✅ TypeScript configuration across all packages
* ✅ Shared UI component library with shadcn/ui
* ✅ ESLint configuration packages

### Authentication & Authorization
* ✅ WorkOS authentication integration with AuthKit
* ✅ Global middleware protection for authenticated routes
* ✅ Auth webhook endpoint for user lifecycle events
* ✅ User database schema with auth events tracking

### Database & Schema
* ✅ Drizzle ORM setup with PostgreSQL
* ✅ Database migrations (4 migrations completed)
* ✅ Schema definitions:
  - Users table
  - Auth events table
  - API keys table (with hashing and last4 display)
  - Jobs table (with status tracking, timing, GPU metrics)

### API & Backend
* ✅ Elysia backend with Next.js catch-all API route
* ✅ CORS configuration for API access
* ✅ Swagger/OpenAPI documentation (`/api/docs`)
* ✅ API key generation and management endpoints:
  - `POST /api/admin/keys` - Generate new API key
  - `GET /api/admin/keys` - List user's API keys
  - `DELETE /api/admin/keys/:id` - Delete API key (stubbed)
* ✅ API key hashing with SHA-256 and secure storage
* ✅ Generate endpoint: `POST /api/v1/generate`

### Job Queue & Worker
* ✅ BullMQ setup with Redis connection
* ✅ Generate queue configuration with retry logic
* ✅ Worker process with concurrency control
* ✅ Job queue integration in generate endpoint
* ✅ Database schema for job tracking (status, timing, results)
* ✅ Graceful shutdown handling

### Dashboard & Frontend
* ✅ Next.js 15 App Router structure
* ✅ Dashboard home page with model listing
* ✅ Dynamic model detail pages (`/dashboard/model/[id]`)
* ✅ Profile page
* ✅ Code display components for API examples
* ✅ Generate button component
* ✅ Header and navbar components
* ✅ Toast notifications (Sonner)

---

## ❌ What's Left To Do

### Core Inference & GPU
* ❌ RunPod.io integration for GPU nodes
* ❌ Actual model inference logic in worker process
* ❌ Model container/Docker setup for RunPod
* ❌ GPU health check and availability tracking
* ❌ Multi-GPU load balancing logic

### Storage & Assets
* ❌ S3/R2 storage integration for generated artifacts
* ❌ Pre-signed URL generation for secure asset access
* ❌ Asset cleanup/retention policies
* ❌ Image/video optimization pipeline

### API Features
* ❌ API key authentication middleware implementation
* ❌ Rate limiting per API key
* ❌ Usage tracking and metering
* ❌ Job status polling endpoint (`GET /api/v1/jobs/:id`)
* ❌ Webhook callbacks for job completion
* ❌ Streaming/real-time progress updates

### Model Management
* ❌ Model CRUD endpoints (create, read, update, delete)
* ❌ Model version management
* ❌ Model configuration schema (inputs, outputs, parameters)
* ❌ Model deployment and health status tracking
* ❌ Model catalog with metadata (pricing, speed, examples)

### Dashboard Features
* ❌ Job history and monitoring page
* ❌ Usage analytics and metrics
* ❌ API key management UI
* ❌ Model management interface
* ❌ Real-time job status updates
* ❌ Cost/usage dashboard

### Billing & Monetization
* ❌ Usage metering per job
* ❌ Credit/balance system
* ❌ Pricing tiers per model
* ❌ Billing integration (Stripe/similar)
* ❌ Invoice generation

### Production & Operations
* ❌ Environment configuration management
* ❌ Error tracking (Sentry/similar)
* ❌ Logging and monitoring
* ❌ Production deployment configs (Docker, CI/CD)
* ❌ Database connection pooling optimization
* ❌ Caching strategy for frequently accessed data
* ❌ API rate limiting with Redis

### Documentation
* ❌ API usage documentation and examples
* ❌ Model-specific integration guides
* ❌ Quickstart guide for developers
* ❌ Deployment guide
* ❌ Architecture diagrams

### Testing & Quality
* ❌ Unit tests for API endpoints
* ❌ Integration tests for job queue
* ❌ End-to-end tests for dashboard
* ❌ Load testing for API throughput

---

## 🚀 Quick Start

### Prerequisites
```bash
pnpm install
```

### Environment Variables
Set up `.env` files in:
- `apps/web/.env.local` - WorkOS keys, database URL
- `apps/worker/.env` - Redis connection, database URL

### Running Locally
```bash
# Start web app
pnpm --filter web dev

# Start worker
pnpm --filter worker-server dev
```

### Adding UI Components
```bash
pnpm dlx shadcn@latest add button -c apps/web
```

---

## 📁 Project Structure

```
goshen-ai/
├── apps/
│   ├── web/              # Next.js dashboard & API proxy
│   └── worker/           # BullMQ worker for job processing
├── packages/
│   ├── db/               # Drizzle schema & migrations
│   ├── ui/               # Shared shadcn/ui components
│   ├── eslint-config/    # Shared ESLint configs
│   └── typescript-config/ # Shared TS configs
└── services/
    └── gpu/              # GPU inference services (WIP)
```
