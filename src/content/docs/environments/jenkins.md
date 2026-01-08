---
title: Jenkins (Scheduled Pipelines)
description: Monitor scheduled Jenkins pipelines with Pakyas
---

> Pakyas requires an expected schedule. Use this integration for Jenkins jobs
> triggered by cron or timers (e.g., nightly builds, periodic tests).

## Setup

### 1. Add Credential
Go to Manage Jenkins > Credentials > System > Global credentials.
- Kind: Secret text
- Secret: `pk_live_...`
- ID: `PAKYAS_API_KEY`

### 2. Pipeline Example (Declarative)

```groovy
pipeline {
    agent any
    triggers {
        cron('H 2 * * *')  // nightly at ~2 AM
    }
    environment {
        PAKYAS_API_KEY = credentials('PAKYAS_API_KEY')
    }
    stages {
        stage('Prepare') {
            steps {
                sh 'curl -fsSL https://pakyas.com/install.sh | bash'
            }
        }
        stage('Build') {
            steps {
                sh 'pakyas monitor nightly-build -- ./gradlew build'
            }
        }
    }
}
```

## Post-Build Actions

If you prefer `curl` or want to handle notifications in the `post` block:

```groovy
pipeline {
    agent any
    triggers {
        cron('H 2 * * *')  // nightly at ~2 AM
    }
    environment {
        PAKYAS_API_KEY = credentials('PAKYAS_API_KEY')
    }
    stages {
        stage('Work') {
            steps {
                sh 'pakyas ping nightly-build --start'
                sh './do-work.sh'
            }
        }
    }
    post {
        success {
            sh 'pakyas ping nightly-build'
        }
        failure {
            sh 'pakyas ping nightly-build --fail'
        }
    }
}
```
