---
title: ZSH Guide
summary: "One of the core elements of a developers, operations, and security engineers system is having a powerful shell"
date: "2023-01-18T13:00:00.000Z"
banner:
  path: /media/yt/banner.webp
  caption: "GeekMasher"
tags:
  - YouTube
  - Zsh
  - Zshell
  - Guides
  - Bash
  - Configuration

---

One of the core elements of a developers, operations, and security engineers system is having a powerful shell.
This video is a guide on how to install, configure, and customize ZSH to make it beautiful and making your life easier when using your shell.


## Video Guide

{{< youtube d-IWtUunzm8 >}}


## Installing ZSH

Lets get started by installing ZSH on our system.

Its very easy to install on almost every operating system as zshell is pretty much available from most package managers on Linux and MacOS:

```bash 
# Debian / Ubuntu
apt install zsh

# Arch / Manjaro
pacman -S zsh

# MacOS
brew install zsh
```

The other tool we will be install is Oh My ZSH which is an open source framework for managing your ZSH configurations.

We can simply run a `curl` command to install Oh My ZSH:

```bash 
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

The two main reasons for installing Oh My ZSH is the themes and plugins available to us which we’ll cover later.


## Configuration and Customization

### Themes

You can see [a list of all the default themes](https://github.com/ohmyzsh/ohmyzsh/wiki/themes) built into [Oh My ZSH](https://github.com/ohmyzsh/ohmyzsh).


*`~/.zshrc`*

```bash 
# ZSH_THEME="robbyrussell"
# ZSH_THEME="fino"
ZSH_THEME="agnoster"
```

### Plugins 

You can find [a list of all the default plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins) built into Oh My ZSH.


*`~/.zshrc`*

```bash 

# https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins
plugins=(
    # Tools 
	git,
    docker,
    kubectl,
    tmux,

	# OS
	debian,
    macos,

    # Programming Languages
	rust,
    python,

	# Misc
    colored-man-pages,
	web-search
)
```


## Tips && Tricks

Here is a bunch of tips and tricks that I think is useful to know.


### Default Shell

If you want to run ZSH as your default shell on your system, you need to run the change shell command to set it for your user.

```bash
# Run Change Shell tool
chsh -s $(which zsh)
```

### Using Dotfiles Repositpory

[Check out my guide to using dotfiles](https://geekmasher.dev/dotfiles-guide)


### Adding Custom Aliases and Functions

Take a look at some of my bash scripts in my dotfiles GitHub repositpory.

https://github.com/GeekMasher/.dotfiles/tree/main/geek/.geek


### Additional Plugins

You can also install additional plugins in ZSH that are outside of the default plugins.

Here are some of those that I think are worth bringing up:

```bash
# https://github.com/zsh-users

plugins=(
    # https://github.com/zsh-users/zsh-autosuggestions
    zsh-autosuggestions
    # https://github.com/zsh-users/zsh-syntax-highlighting
    zsh-syntax-highlighting
)
```


### Neofetch

```bash 
# Run neofetch if present on machine
if [ -x "$(command -v neofetch)" ]; then
    neofetch
fi
```

## Resources

- [ZSH Install Guide](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
- [Oh My ZSH repository](https://github.com/ohmyzsh/ohmyzsh/)

