# CV Website

Static personal CV website served by Nginx and delivered through GitHub Actions, GHCR, Argo CD, and the separate `cv-gitops` repository.

This repository now has two clearly separated delivery paths:
- `cosmin-lab.cloud`
  Docker-based delivery to the on-prem cluster
- `cosmin-lab.com`
  manual Azure Static Web App deployment without Docker

## Repositories

- `cv_website`
  application source, Docker image build, promotion workflows, and Argo CD application manifest
- `cv-gitops`
  Kubernetes deployment manifests tracked by Argo CD

## Workflows

- `stg-cloud-domain.yml`
  automatic Docker build and on-prem deployment for `cosmin-lab.cloud`
- `prod-com-domain.yml`
  manual Azure Static Web App deployment for `cosmin-lab.com` without Docker

## Delivery Flow For `cosmin-lab.cloud`

1. Push to `main`
2. GitHub Actions validates files, builds the image, runs a Trivy scan, and smoke tests the container
3. If successful, it pushes:
   - a short SHA tag
   - a `0.0.x` deployment tag
4. The workflow updates `cv-gitops`
5. Argo CD syncs the new image into the on-prem cluster that serves `cosmin-lab.cloud`

This keeps the default `push -> deploy` path isolated to `cosmin-lab.cloud`, while `cosmin-lab.com` can continue to be updated later in Azure only when explicitly approved.

## Azure Static Web App Notes For `cosmin-lab.com`

`prod-com-domain.yml` does not use Docker. It deploys the static files directly to Azure Static Web Apps after a manual confirmation.

Required GitHub repository secrets:
- `AZURE_STATIC_WEB_APPS_API_TOKEN_COSMIN_LAB_COM`
  the deployment token copied from the Azure Static Web App for `cosmin-lab.com`

## Operations Notes

- [K8s Network Policies](./k8s-network-policies/README.md)

## DDoS Blocklist Integration

`cosmin-lab.cloud` can consume dynamic blocked IPs from `ddos-agent`.

Runtime env vars:
- `BLOCKLIST_URL` (default: `http://ddos-agent.ddos-protection.svc.cluster.local:8080/blocklist.txt`)
- `BLOCKLIST_SYNC_INTERVAL_SECONDS` (default: `15`)

Nginx blocks requests when `CF-Connecting-IP` matches the synchronized blocklist.
