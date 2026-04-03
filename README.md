# CV Website

Static personal CV website served by Nginx and delivered through GitHub Actions, GHCR, Argo CD, and the separate `cv-gitops` repository.

This repository now has two clearly separated delivery paths:
- `cosmin-lab.cloud`
  Docker-based delivery to the on-prem cluster
- `cosmin-lab.com`
  manual Azure Web App deployment without Docker

## Repositories

- `cv_website`
  application source, Docker image build, promotion workflows, and Argo CD application manifest
- `cv-gitops`
  Kubernetes deployment manifests tracked by Argo CD

## Workflows

- `verify-shared-site.yml`
  shared validation for pull requests and manual checks
- `stg-cloud-domain.yml`
  automatic Docker build and on-prem deployment for `cosmin-lab.cloud`
- `cloud-release-manual.yml`
  manual release tagging flow for the `.cloud` image
- `prod-com-domain.yml`
  manual Azure Web App deployment for `cosmin-lab.com` without Docker

## Delivery Flow For `cosmin-lab.cloud`

1. Push to `main`
2. GitHub Actions validates files, builds the image, runs a Trivy scan, and smoke tests the container
3. If successful, it pushes:
   - a short SHA tag
   - a `0.0.x` deployment tag
4. The workflow updates `cv-gitops`
5. Argo CD syncs the new image into the on-prem cluster that serves `cosmin-lab.cloud`

## Manual Promotion

`cloud-release-manual.yml` is manual only. It can retag a tested `0.0.x` image to `1.0.0`, `1.0`, `1`, and `latest` after explicit approval.

This keeps the default `push -> deploy` path isolated to `cosmin-lab.cloud`, while `cosmin-lab.com` can continue to be updated later in Azure only when explicitly approved.

## Azure Web App Notes For `cosmin-lab.com`

`prod-com-domain.yml` does not use Docker. It packages only the static files and deploys them to Azure Web App after a manual confirmation.

Required GitHub repository secrets:
- `AZURE_WEBAPP_NAME_COSMIN_LAB_COM`
  the Azure Web App name for `cosmin-lab.com`
- `AZURE_WEBAPP_PUBLISH_PROFILE_COSMIN_LAB_COM`
  the publish profile downloaded from the Azure Web App

## Operations Notes

- [K8s Network Policies](./k8s-network-policies/README.md)
