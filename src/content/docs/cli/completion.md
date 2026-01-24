---
title: completion Command
description: Generate shell completion scripts
---

The `completion` command generates tab-completion scripts for your shell. These scripts enable auto-completion of commands, subcommands, and flags when you press Tab.

## Usage

```bash
pakyas completion <SHELL>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `SHELL` | Shell to generate completions for: bash, zsh, fish, powershell, elvish |

## Installation by Shell

### Bash

```bash
pakyas completion bash > ~/.local/share/bash-completion/completions/pakyas

# Restart shell or source the file
source ~/.local/share/bash-completion/completions/pakyas
```

### Zsh

```bash
# Ensure completion directory exists and is in fpath
mkdir -p ~/.zfunc
pakyas completion zsh > ~/.zfunc/_pakyas
```

:::note
Add the following to your `~/.zshrc` if not already present:

```bash
fpath=(~/.zfunc $fpath)
autoload -Uz compinit && compinit
```

Then restart your shell or run `source ~/.zshrc`.
:::

### Fish

```bash
pakyas completion fish > ~/.config/fish/completions/pakyas.fish
```

:::tip
Fish loads completions automatically from `~/.config/fish/completions/`. No additional setup required.
:::

### PowerShell

```powershell
pakyas completion powershell >> $PROFILE

# Restart PowerShell
```

### Elvish

```bash
pakyas completion elvish > ~/.config/elvish/lib/pakyas.elv
```

Add to your `~/.config/elvish/rc.elv`:

```elvish
use pakyas
```

## Verifying Installation

After installation, type `pakyas ` and press Tab. You should see command suggestions like:

```
auth       check      api-key    completion ping       ...
```

Typing `pakyas check ` and pressing Tab should show subcommands:

```
create     delete     doctor     inspect    list       tail       ...
```

## See Also

- [CLI Overview](./index/) - Introduction to the Pakyas CLI
