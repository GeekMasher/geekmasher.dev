---
title: "Launching Konarr"
summary: "Konarr is a new open source project developed as a simple, easy-to-use supply chain monitoring tool for your homelab"
slug: "launching-konarr"
date: "2024-11-01T10:00:00.000Z"
banner:
  path: "/media/sec/konarr/launch-banner.png"
  caption: "Ferris, Konarr, and VueJS logos"
tags:
  - Konarr
  - Security
  - AppSec
  - Containers 
  - Homelab
  - Supply Chain

---

Today I'm open sourcing my current passion project, Konarr!

[Konarr][repository] is a simple, easy-to-use web interface and API for monitoring your servers, clusters, and containers dependencies to find supply chain security vulnerabilities.
The goal with Konarr is to offer a free and open source alternative to products on the market today.
It is designed to be lightweight and fast, with minimal resource usage.

## Backstory

This project came out of the need to monitor my homelab for insecure dependencies / components.
As someone that runs many conatiners and services that are not developed by me, this is a big concern.
All the products that offer these features are mostly proprietary or/and cost money to use.


[In December 2021, Log4Shell (CVE-2021-44228)][log4shell] dropped and like most of the world I was running around trying to find if I had a service using it.
This was an absolute nightmare as I thought first of all that I wasn't vulnerable to to the attack but it turns out I was.
Search thought all my containers and scanning them was a painful process. 

Another issues I faced was "where is the data / alerts stored?" which turns out most of the tools store that data on their servers.
I didn't want this at all and I want to keep my data locally on my home network (whole reason I run a homelab in the first place).

### Name Origin                                                                                          
                                                                                                          
Konarr is from the name [Konar quo Maten](https://oldschool.runescape.wiki/w/Konar_quo_Maten) (translated as Konar the Hunter) from the game [Old School Runescape](https://oldschool.runescape.com/).


## The Tech Stack

This project is still under active development by nameself but I want to extend the features to suit more users and home-lab enviroments.

At the core of Konarr is the REST API and backend service built in Rust 🦀 using SQLite.
This is very important aspect of Konarr was to be able to do everything via a REST API to help with automation in my homelab.

The frontend is developed using VueJS as the frontend framework and uses Typescript.
This was due to a number of factors and experiments I did but I believe VueJS was right choice.

The beauty of the frontend being detacted from the baclend means I can swap in and out the frontend if I or others need a better frontend.

## Features

Right now for the launch there are a number of core features that needed to happen.
The main features were the following:

### Creating and managing Servers, Clusters, and Conatiners

You can define different Projects (and there types) to capture the data about a Server, Cluster, and Containers.

![konarr-projects](/media/sec/konarr/projects-view.png)

Servers, Groups, and Clusters can have sub-projects which means you can add Conatiner Projects under them.

### Listing, Searching, and Showing Dependencies

The Konarr Server tracks all the dependencies detected in a Containers.
This is extremely important to be able to search for a particualr dependency.

![konarr-deps](/media/sec/konarr/dependencies-view.png)

A nice feature is the ability to filter or search the dependencies.

![konarr-dark-mode](/media/sec/konarr/dark-mode.png)

*Sidenote:* Dark mode is supported 😎 (unlike this blog 😬)

### Automatically upload Bill of Materials

The Konarr Agent automatically detects and uploads SBOMs of the containers on Servers and posts the data to Konarr.
This also includes automatically monotoring the conatiners continuously.

The default tool being used by Konarr CLI / Agent in v0.1 is [Syft][syft] from Anchore.
You can use any tool you want to but this is the one installed in the Konarr CLI container.

The Konarr server only supports the indexing of CycloneDX but other formats will be supported at a later date.

### Highly Configurable

One of the key features of a Open Source homelab project is a declaritive configuration file in YAML.
Konarr has a `konarr.yml` which allows you to define the different features as you want.


## Transparency

An important element of free and open source projects is the transparency of the development and vision of the project.
Starting today, the [Konarr Project Board][konarr-project-board] will be open to give a transparent roadmap of the features and bugs being worked on.

## Questions and Answers

### How can I run Konarr today?

[Checkout the `Quick start` guide in the repository README.md.][quick-start]

### When should I use Konarr?

If you run a homelab and want to know what dependencies your containers use, this could be a great project to try out.

If you don't like running beta projects, this might not be the project for you.

### How can I contribute to the project?

You can help everything from:

- [Staring the project][github-stars]
- Sharing of you platform of choice
- [Raising bug reports][github-issues]
- [Requesting new features][github-issues]
- [sending in Pull Requests][github-pulls]

### Can this only be used in a Homelab?

No.
You can use Konarr how ever you want to use it but note that current the project is still in active development.

## Conclusion

I hope people enjoy and find this project useful when managing and monitoring homelabs or even production applications.
My goal is to continuously improve this project until a point I can launch a v1.

Any feedback or discussions are welcome!

<!-- Resources -->

[repository]: https://github.com/42ByteLabs/konarr
[github-stars]: https://github.com/42ByteLabs/konarr/stargazers
[github-issues]: https://github.com/42ByteLabs/konarr/issues
[github-pulls]: https://github.com/42ByteLabs/konarr/pulls
[konarr-project-board]: https://github.com/orgs/42ByteLabs/projects/3
[rust-lang]: https://www.rust-lang.org/
[vuejs]: https://vuejs.org/
[log4shell]: https://en.wikipedia.org/wiki/Log4Shell
[syft]: https://github.com/anchore/syft
[quick-start]: https://github.com/42ByteLabs/konarr?tab=readme-ov-file#-quick-start

