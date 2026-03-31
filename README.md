# CV Website

Static personal CV website served by Nginx and delivered through GitHub Actions, GHCR, Argo CD, and the separate `cv-gitops` repository.

## Repositories

- `cv_website`
  application source, Docker image build, promotion workflows, and Argo CD application manifest
- `cv-gitops`
  Kubernetes deployment manifests tracked by Argo CD

## Delivery Flow

1. Push to `main`
2. GitHub Actions validates files, builds the image, runs a Trivy scan, and smoke tests the container
3. If successful, it pushes:
   - a short SHA tag
   - a `0.0.x` deployment tag
4. The workflow updates `cv-gitops`
5. Argo CD syncs the new image into the cluster

Manual promotion is handled by `promote.yml`, which can retag a tested `0.0.x` image to `1.0.0`, `1.0`, `1`, and `latest`.
