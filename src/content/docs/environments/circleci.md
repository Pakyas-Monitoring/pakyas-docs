---
title: CircleCI
description: Monitor CircleCI pipelines with Pakyas
---

## Setup

### 1. Contexts (Recommended)
Go to Organization Settings > Contexts.
Create a context named `pakyas` and add environment variable:
- `PAKYAS_API_KEY`: `pk_live_...`

### 2. Config Example

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: Install Pakyas
          command: curl -fsSL https://pakyas.com/install.sh | bash
      - run:
          name: Run Job
          command: pakyas monitor nightly-build -- ./run-tests.sh

workflows:
  nightly:
    jobs:
      - build:
          context: pakyas
    triggers:
      - schedule:
          cron: "0 0 * * *"
          filters:
            branches:
              only:
                - main
```

## When `always` is needed

CircleCI's `when: always` attribute is useful for ensuring final pings send.

```yaml
steps:
  - run: pakyas ping nightly-build --start
  - run: ./hazardous-script.sh
  - run:
      when: on_success
      command: pakyas ping nightly-build
  - run:
      when: on_fail
      command: pakyas ping nightly-build --fail
```
