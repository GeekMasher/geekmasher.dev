---
title: "Quibble: Part 1 - Designing a Container Security Tool"
summary: "Quibble is a container security tool I built to support my Homelab container setup using Docker and Podman compose! This is part 1 of a series to talk about the different components and features I will be building into Quibble"
date: "2022-12-08"
slug: "sec-quibble-introduction"
banner:
  path: /media/sec/quibble/ComposeBlogPost.png
  caption: "Rust, Docker, Podman, and Cybersecurity Icon"
  link: "#resources"
tags:
  - Security
  - Containers
  - Compose
  - Docker
  - Podman
  - Quibble
  - Tools
  - Homelab

---

Over the past 2 weeks, I have been working on improving my Homelab setup along with updating some of the components in the environment. One of my main concerns is all of the configurations I have when it comes to managing my containers (mainly using Docker but migrating slowly to Podman).

I’m not using [Kubernetes (K8s)](https://kubernetes.io/) or other orchestration tools as this is overkill for me, so for the past few years I’ve decided to use [Docker Compose](https://github.com/docker/compose) and [Podman Compose](https://github.com/containers/podman-compose). This means that all of my services from [PiHole](https://github.com/pi-hole/pi-hole) to [NextCloud](https://github.com/nextcloud/server) all have a compose files to configure and manage these services. This allows me to write and maintain all of my configurations in git repositories and deploy changes to the machines automatically using CI.

Something I noticed for most of the container security tools out there focus on Docker, mainly focusing on the [Software Composition Analysis](https://owasp.org/www-community/Component_Analysis) side, or K8, focusing of configuration misuse. This meant that most of the tools out there aren’t that useful to me but I wanted something to help me (and others) write more security focused compose configuration files.

This is where Quibble was born!

## What is Quibble?

Quibble is a Rust based open-source container analysis tool that reads and assesses various security, quality and noteworthy things about your configuration and setup.

Before writing any tool you should do your research and Quibble was no exception. This allows you to know prior to building a tool if it's worth your time and what should be the scope of the tool.

Prior to building Quibble, I knew quite a few different best practices and what to avoid using containers. This a great start that I could make into rules but there is little point of writing a fully featured tool for 2 or 3 rules. I wanted to see what were the different types of features and rules I should add to Quibble.

### Quibble Core Features

There was a set of criteria that I wanted to do to make sure Quibble hit all of the targets I set out to solve.

1. [Parse and load Compose Spec](https://github.com/compose-spec/compose-spec) files
    - This would allow rules to parse and run rules on the compose spec
2. Define a set of rules
    - A list of all the checks we want to look for
3. Export the information found into an easy to consume format
    - Export to the console or/and other formats

The main focus of Quibble is to focus on the compose spec but as time goes on, new features will be added. Future posts will talk about these.


### Quibble Rules

#### Container Socket Mounting

This is the big one! Mounting the container socket into an untrusted container is similar to giving an untrusted binary root privileges on a system. This would allow containers to spin up new containers with over permissive access over the host.

Now, in some cases you may want this. This the case of my Homelab; I use [Traefik](https://traefik.io/) as a reverse-proxy which allows you to configure automatically new routes when a container is spun up using the correct labels. To do this [the Docker socket is passed into the container](https://doc.traefik.io/traefik/providers/docker/#docker-api-access) - see the warning the Traefik team have added for this exact reason.

#### Extra Kernel Features

Extra Kernel features might allow a compromised container to access features that typically containers shouldn’t have access to. This can include lower level Network or System access on the host. This comes in the form of `[cap_add](https://docs.docker.com/compose/compose-file/compose-file-v3/#cap_add-cap_drop)` and `[sysctls](https://docs.docker.com/compose/compose-file/compose-file-v3/#sysctls)` in compose files.

This can be shown when using a VPN server container which needs access to certain networking features to tunnel / NAT traffic for incoming clients. See [Wireguard's Docker Compose file example](https://github.com/linuxserver/docker-wireguard/tree/master#docker-compose-recommended-click-here-for-more-info) or [PiHoles docs when using DHCP](https://github.com/pi-hole/docker-pi-hole#quick-start) for reference.

#### Mounting System Folders into the Container

This one is similar to the Docker Socket mounting but focuses on system directories that are mounted into the container. This is quite rare but in most cases but could lead to security issues.

An example of this would be mounting in a Home directory and the container modifies the `$HOME/.bashrc` file or adds their other SSH Key to `$HOME/.ssh/authorized_keys`.

#### Untrusted Registries or Namespace

This is subject to who you trust and allow to use. If you are using a container from an unknown registry like `[registry.malware.co](http://registry.malware.com)m/python:3.10` and you don’t own or it isn’t a registry you trust, you shouldn’t use it. The main question is which registries should you trust? This is the exact same issue with namespace, organisation, or username.

The focus on [Quibble in V0.1 is to focus on 2 main trusted sources](https://github.com/GeekMasher/quibble/blob/a3434a3eb5cc71c72f8f55ab9eb4c0d198122dac/src/compose/rules.rs#L49):

- [docker.io](http://docker.io) (default)
- [ghcr.io](http://ghcr.io) (GitHub container registry)

In V0.2, the plan is that this is configurable by the user to make sure you can add your own trusted container registries. This includes, allow / deny lists of namespaces that are or aren’t allowed to be used in configurations.

As I host an internal registry in my Homelab, this will be important for me to make sure I don’t get false positives in Quibble.

#### Hardcoded Secrets in Compose Files

Another big subject is hardcoding credentials in your compose files or leaving them in environment files that are stored in the same repos. Most services have key / password like values set which are used to authenticate to. 

There are many different types of checks when it comes to this but some basic pattern matching and parsing should do the trick.

#### Container Images Themselves

There are so many other checks that the containers themselves could have which I will be taking a look into such as:

- Using `latest` or `main` tags
    - Reduce the risk of issues with error prone containers
- Vulnerable components installed and used in the container
    - Software Composition Analysis of the containers
- Running as root in the container

## Conclusion & Next Post

So now we have the minimal features and rules we want to implement. The next step is to start talking about the code I wrote to get here.

This is the first post in a series of Quibble and what I learnt in my journey to get to a finished tool. The next post will be out in a few days and will be about the `compose` mode of Quibble.

## Resources

- [OWASP Docker Security (Top 10 project)](https://github.com/OWASP/Docker-Security)
    - [Presentation by @drwetter@twitter.com](https://owasp.org/www-pdf-archive/Dirk_Wetter_-_Docker_Top10-AMS.pdf)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [Docker Daemon Attack Surface](https://docs.docker.com/engine/security/#docker-daemon-attack-surface)
- [Docker Linux Kernel Capabilities](https://docs.docker.com/engine/security/#linux-kernel-capabilities)
- [Istio - securityContext.capabilities.add - NET_ADMIN & NET_RAW](https://dev.to/mxglt/istio-securitycontext-capabilities-add-netadmin-netraw-35dn)

### Credits

- Main artwork was created by GeekMasher
- ["Cyber Security" Icon](https://www.flaticon.com/free-icon/cyber-security_4744315?related_id=4744315) by created by [Freepik - Flaticon](https://www.flaticon.com/free-icons/security)
- [Rust Logo](https://icon-icons.com/icon/rust-lang-logo/169776) from [icon-icons.com](http://icon-icons.com/)
- [Docker Logo](https://www.docker.com/company/newsroom/media-resources/) from [docker.com](http://docker.com/)
- Podman Logo from [podman.io](http://podman.io/)
