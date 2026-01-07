---
title: Monitoring Kubernetes CronJobs
description: How to monitor K8s CronJobs with Pakyas
---

Kubernetes CronJobs are scheduled workloads that run in pods. When a CronJob fails, Kubernetes may retry or simply mark it failed—but you won't know unless you're watching the cluster.

## Configuration

Pass your API key as a Kubernetes secret:

```yaml
env:
  - name: PAKYAS_API_KEY
    valueFrom:
      secretKeyRef:
        name: pakyas-credentials
        key: api-key
```

Create the secret:

```bash
kubectl create secret generic pakyas-credentials --from-literal=api-key=pk_live_xxxxx
```

See [Environment Variables](/config/env-vars/) for all options.

## When to use this

- CronJobs run on a schedule in Kubernetes
- Missing a run affects your application
- You need alerts outside the cluster

## Basic example

Update your CronJob spec to wrap the command with pakyas:

```yaml
spec:
  containers:
    - name: job
      image: your-image
      command: ["pakyas", "monitor", "k8s-cronjob", "--", "/app/run.sh"]
```

Pakyas sends pings from inside the pod, so you get alerts even if the cluster itself has issues.

## Scheduler setup

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-job
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: job
              image: your-image
              command: ["pakyas", "monitor", "k8s-cronjob", "--", "/app/run.sh"]
          restartPolicy: OnFailure
```

## What Pakyas detects

- Job container exits non-zero
- Job runs longer than expected
- Job never runs (missed schedule)
