---
title: Dotfiles Guide
summary: "Setting up your dotfiles the correct way can be a pain but it doesn't have to be. Take a look at this post on how I setup and handle my dotfiles"
date: "2023-01-04T15:00:00.000Z"
banner:
  path: /media/yt/dotfiles-guide-2023.webp
  caption: "GeekMasher"
tags:
  - YouTube
  - Dotfiles
  - Guides
  - Bash
  - Zsh
  - Configuration

---

As my first video in 10 years, I wanted to talk about how I setup and use my dotfiles for others to watch and benefit from.
This video shows you how you can use a git repository along with stow to setup the perfect enviroment every time you setup a new laptop, desktop, or server.


## Video Guide

{{< youtube OHR0v0jrDik >}}


### Install Stow

This is how I recommend installing stow on your system:

```bash
# Debian / Ubuntu
apt install stow

# Brew (MacOS)
brew install stow
```


### Install Dotfiles Script

This is an install script to automatically remove and add synlinks using stow.

```bash 
#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

DOT_FOLDERS="bash,zsh,nvim"

for folder in $(echo $DOT_FOLDERS | sed "s/,/ /g"); do
    echo "[+] Folder :: $folder"
    stow --ignore=README.md --ignore=LICENSE \
        -t $HOME -D $folder
    stow -v -t $HOME $folder
done

# Reload shell once installed
echo "[+] Reloading shell..."
exec $SHELL -l

```

You can find my install script here on GitHub:

https://github.com/GeekMasher/.dotfiles/blob/main/install.sh 

This script is a little more complicated but allows me to role out different "profiles" for different machines


## Resources

1. [Dotfiles](https://dotfiles.github.io/)
1. [Stow](https://www.gnu.org/software/stow/)


### Images / Banner

1. Git Logo
1. Bash Logo

