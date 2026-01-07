---
title: Jenkins
description: Monitor Jenkins pipelines with Pakyas
---

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
                sh 'pakyas monitor jenkins-build -- ./gradlew build'
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
    environment {
        PAKYAS_API_KEY = credentials('PAKYAS_API_KEY')
    }
    stages {
        stage('Work') {
            steps {
                sh 'pakyas ping my-job --start'
                sh './do-work.sh'
            }
        }
    }
    post {
        success {
            sh 'pakyas ping my-job'
        }
        failure {
            sh 'pakyas ping my-job --fail'
        }
    }
}
```
