# CV Website

Static personal CV website served by Nginx and delivered through GitHub Actions, GHCR, Argo CD, and the separate `cv-gitops` repository.

The automated delivery path in this repository is intended for `cosmin-lab.cloud` only. Azure / `cosmin-lab.com` should remain a separate, manual promotion step.

## Repositories

- `cv_website`
  application source, Docker image build, promotion workflows, and Argo CD application manifest
- `cv-gitops`
  Kubernetes deployment manifests tracked by Argo CD

## Delivery Flow For `cosmin-lab.cloud`

1. Push to `main`
2. GitHub Actions validates files, builds the image, runs a Trivy scan, and smoke tests the container
3. If successful, it pushes:
   - a short SHA tag
   - a `0.0.x` deployment tag
4. The workflow updates `cv-gitops`
5. Argo CD syncs the new image into the on-prem cluster that serves `cosmin-lab.cloud`

## Manual Promotion

`promote.yml` is manual only. It can retag a tested `0.0.x` image to `1.0.0`, `1.0`, `1`, and `latest` after explicit approval.

This keeps the default `push -> deploy` path isolated to `cosmin-lab.cloud`, while `cosmin-lab.com` can continue to be updated later in Azure only when explicitly approved.

## Operations Notes

- [K8s Network Policies](./k8s-network-policies/README.md)
