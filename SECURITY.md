# Security policy

This repository contains **proprietary** software. Treat all contents as confidential unless HD Corporate has agreed otherwise in writing.

## Reporting a vulnerability

Report security issues **privately** — do not open a public issue with exploit details.

- Prefer **GitHub Security Advisories** for this repository (**Security → Report a vulnerability**), if enabled.
- Otherwise use a **private channel** already established with HD Corporate.

Include: affected component (marketing, API, backoffice), reproduction steps, and impact assessment if possible.

## Secrets and configuration

- **Never commit** real credentials: `.env`, `.env*.local`, API keys, database URLs, webhook secrets (Cal.com, etc.), Auth0 secrets, or private keys (`.pem`, `.p12`, `.key`).
- Use only **`.env.example`** (placeholders) in Git. Local secrets stay in `.env*.local` (gitignored).
- If any secret was pushed to Git (even briefly): **rotate it immediately** in the provider console, then consider cleaning Git history with team approval (`git filter-repo` or equivalent).

## Hardening in this codebase

- HTTP security headers are applied on **Next.js** (marketing, backoffice) and on the **API** (Hono) where applicable.
- Public API CORS is restricted to origins listed in `API_ALLOWED_ORIGINS` (see `apps/api/.env.example`).
- Webhooks verify provider signatures (e.g. Cal.com HMAC) before processing.

## Supported versions

Security-relevant fixes are applied on the **default branch** for active deployments. Older branches or tags may not be maintained.
