---
title: GitLab CI
description: Monitor GitLab CI pipelines with Pakyas
---

## Setup

### 1. Add Variable
Go to Settings > CI/CD > Variables and add:
- Key: `PAKYAS_API_KEY`
- Value: `pk_live_...`
- Type: Variable
- Flags: Masked (Recommended), Protected (if used on protected branches)

### 2. Configure `.gitlab-ci.yml`

```yaml
stages:
  - build

nightly-job:
  stage: build
  script:
    # Install Pakyas (or use a docker image that has it)
    - curl -fsSL https://pakyas.com/install.sh | bash
    # Wrap your command
    - pakyas monitor nightly-build -- ./run_tests.sh
  only:
    - schedules
```

## Using `after_script`

To ensure pings are sent even if the script crashes, you can use `after_script`, but keep in mind `after_script` runs in a separate shell context, so local variables won't persist.

```yaml
nightly-job:
  script:
    - pakyas ping nightly-build --start
    - ./hazardous-script.sh
  only:
    - schedules
  after_script:
    - |
      if [ "$CI_JOB_STATUS" == "success" ]; then
        pakyas ping nightly-build
      else
        pakyas ping nightly-build --fail
      fi
```
