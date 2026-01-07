---
title: Kubernetes
description: Monitor Kubernetes CronJobs with Pakyas
---

## Secrets

Create a secret for your API key:

```bash
kubectl create secret generic pakyas-secret --from-literal=api-key=pk_live_...
```

## CronJob Manifest

The best way to use Pakyas in K8s is to wrap your container's command.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-etl
spec:
  schedule: "0 0 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: etl
            image: my-org/etl:latest
            # Override command to wrap with Pakyas
            command: ["pakyas", "monitor", "k8s-etl", "--", "/app/run_etl.sh"]
            env:
              - name: PAKYAS_API_KEY
                valueFrom:
                  secretKeyRef:
                    name: pakyas-secret
                    key: api-key
          restartPolicy: OnFailure
```

## Why wrap the command?

Kubernetes `restartPolicy: OnFailure` will retry the pod if it crashes.
- If you use `pakyas monitor`, it will report a failure ping *before* the pod exits with a non-zero code.
- This allows K8s to restart the pod, while you still get alerted that the specific run failed.
- A "success" ping is only sent when the process exits with 0.

## Sidecar Pattern (Optional)

If you cannot modify the container's command, you can use a sidecar or `initContainer` + shared volume, but simply wrapping the entrypoint is significantly easier and more reliable for CronJobs.
