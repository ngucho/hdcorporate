# Security policy

## Reporting a vulnerability

Please report security issues **privately** (do not open a public GitHub issue).  
Contact the maintainers through a **private channel** you already use with HD Corporate, or via **GitHub Security Advisories** for this repository (**Security → Report a vulnerability**), if enabled.

Include steps to reproduce, affected components (API, marketing, backoffice), and severity if you can.

## Secrets and configuration

- **Never commit** real credentials: `.env`, `.env*.local`, API keys, database URLs, webhook secrets, Auth0 client secrets, or TLS private keys (`.pem`, `.p12`, etc.).
- This repository **ignores** `.env*.local` by default. Use `.env.example` files as templates only (placeholders).
- If a secret was ever pushed to Git history, **rotate it immediately** in the provider dashboard (Resend, Supabase, Auth0, Cal.com, etc.) and consider history cleanup (`git filter-repo`) with team agreement.

## Supported versions

Security fixes are applied on the **default branch** for the deployment configuration in use. Older tags may not receive backports unless agreed with maintainers.

## Scope

Public-facing HTTP surfaces (marketing, public API routes, webhooks) should follow least privilege, validated input, and documented env vars. Internal backoffice access is gated by Auth0 as documented under `docs/security/`.
