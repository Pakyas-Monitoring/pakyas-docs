---
title: Nagios
description: Monitor scheduled Nagios check plugins with Pakyas
---

> This guide covers monitoring Nagios check plugins that run on a schedule.
> Pakyas verifies that each check executed and completed as expected.

## Setup

### 1. Install Pakyas CLI

Install on the Nagios server or the host running NRPE:

```bash
curl -fsSL https://pakyas.com/install.sh | bash
```

### 2. Set API Key

Add to your environment (e.g., `/etc/environment` or the Nagios user's profile):

```bash
export PAKYAS_API_KEY=pk_live_...
```

## Wrapping Check Plugins

### Option A: Wrap the check command (Recommended)

Modify your Nagios command definition to wrap the check with Pakyas:

```cfg
# /etc/nagios/objects/commands.cfg

define command {
    command_name    check_disk_pakyas
    command_line    /usr/local/bin/pakyas monitor disk-usage -- /usr/lib/nagios/plugins/check_disk -w 20% -c 10%
}
```

### Option B: Use in service definition

```cfg
# /etc/nagios/objects/services.cfg

define service {
    use                     generic-service
    host_name               localhost
    service_description     Disk Usage
    check_command           check_disk_pakyas
    check_interval          5        ; runs every 5 minutes
}
```

## NRPE (Remote Checks)

For checks running on remote hosts via NRPE, install Pakyas on the remote host and wrap the command in the NRPE config:

```cfg
# /etc/nagios/nrpe.cfg on remote host

command[check_disk]=/usr/local/bin/pakyas monitor disk-usage -- /usr/lib/nagios/plugins/check_disk -w 20% -c 10%
```

## Check Naming

Name checks by what they verify, not the tool:

| Good | Bad |
|------|-----|
| disk-usage | nagios-disk |
| mysql-health | check_mysql |
| backup-verify | nrpe-backup |

## How it works

1. Nagios schedules the check at the configured interval
2. Pakyas sends a start signal when the check begins
3. The check plugin runs and returns its exit code
4. Pakyas sends success (exit 0) or failure (exit non-zero) to your dashboard
5. If the check doesn't run on schedule, Pakyas alerts you
