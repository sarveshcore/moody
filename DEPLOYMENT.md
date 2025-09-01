# GitHub Actions Deployment Guide

This guide explains how to set up automatic deployment to Google Cloud Run using GitHub Actions.

## Overview

The deployment workflow automatically:

- ✅ Builds and pushes Docker images to Google Container Registry
- ✅ Deploys to Cloud Run in `europe-west1` region
- ✅ Performs health checks to ensure the deployment is successful
- ✅ Verifies the app is serving expected content

## Required GitHub Secrets

You need to set up the following secrets in your GitHub repository:

### Go to: Repository Settings → Secrets and variables → Actions → New repository secret

1. **`GCP_PROJECT_ID`** - Your Google Cloud Project ID
2. **`GCP_SA_KEY`** - Service Account JSON key (see setup below)
3. **Firebase Environment Variables:**
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

## Google Cloud Setup

```bash
# Set your project ID
export PROJECT_ID="your-project-id"

# Create service account
gcloud iam service-accounts create github-actions \
    --description="Service account for GitHub Actions" \
    --display-name="GitHub Actions"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.writer"

# Create and download key
gcloud iam service-accounts keys create key.json \
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com
```

### Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### Add Secrets to GitHub

1. Copy the contents of `key.json`
2. Go to your GitHub repository
3. Settings → Secrets and variables → Actions
4. Create new secret named `GCP_SA_KEY`
5. Paste the JSON content

## Workflow Triggers

The deployment runs on:

- ✅ Push to `main` or `master` branch
- ✅ Pull requests to `main` or `master` branch

## Deployment Configuration

The workflow deploys with these Cloud Run settings:

- **Region**: `europe-west1`
- **Memory**: 1Gi
- **CPU**: 1 vCPU
- **Port**: 3000
- **Min instances**: 0 (scales to zero)
- **Max instances**: 10
- **Traffic**: 100% to latest revision

## Health Check Endpoint

The app includes a health check endpoint at `/api/health` that returns:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "moody",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 123.456
}
```

## Manual Deployment

If you need to deploy manually:

```bash
# Build and push image
docker build -t gcr.io/$PROJECT_ID/moody .
docker push gcr.io/$PROJECT_ID/moody

# Deploy to Cloud Run
gcloud run deploy moody \
  --image gcr.io/$PROJECT_ID/moody \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 3000
```

## Monitoring Deployments

1. **GitHub Actions**: Check the Actions tab in your repository
2. **Cloud Run Console**: [https://console.cloud.google.com/run](https://console.cloud.google.com/run)
3. **Logs**: View logs in Cloud Run console or use `gcloud run logs tail moody --region=europe-west1`

## Troubleshooting

### Common Issues:

**❌ "workflow must specify exactly one of 'workload_identity_provider' or 'credentials_json'"**

- This error occurs when GitHub secrets are not properly set
- Check that all required secrets are added to your repository
- Ensure secrets are not empty or malformed

**❌ Authentication failed**

- Check that `GCP_SA_KEY` secret is correctly formatted JSON
- Verify service account has required permissions

**❌ Health check failed**

- Check Cloud Run logs for startup errors
- Verify environment variables are set correctly
- Ensure port 3000 is exposed in Dockerfile

**❌ Build failed**

- Check Dockerfile syntax
- Verify all dependencies are in package.json
- Check for missing environment variables during build

**❌ Permission denied**

- Ensure service account has Cloud Run Admin role
- Check that required APIs are enabled

**❌ "Permission artifactregistry.repositories.uploadArtifacts denied"**

- Grant `roles/artifactregistry.writer` permission to the service account
- Enable Artifact Registry API: `gcloud services enable artifactregistry.googleapis.com`
- Ensure the service account has access to the correct region

### Quick Fix for Secret Issues:

1. **Check Secret Names**: Ensure exact spelling and case
2. **Re-add Secrets**: Delete and recreate the secret
3. **Check Repository Settings**: Ensure secrets are accessible to workflows

### Getting Help:

1. Check GitHub Actions logs for detailed error messages
2. View Cloud Run service logs in GCP Console
3. Test the health endpoint: `curl https://your-app-url/api/health`

## Your Current Deployment

- **URL**: https://moody-958845268204.europe-west1.run.app
- **Region**: europe-west1
- **Service**: moody
