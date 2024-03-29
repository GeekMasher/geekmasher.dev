---
title: Creating Presentations using Markdown and Marp
created: "2021-10-29T14:00:00.000Z"
template: "post"
draft: false
slug: "/posts/creating-presentations"
banner:
  path: /media/codeql-introduction.png
tags:
  - Presentation
  - Slides
  - Markdown
  - Marp
description: "Have you ever wanted to create a presentation that isn't a pptx or Google Sheet? Don't look any further then Markdown and Marp!"
---

During the past two month I volunteer to present at both [DC44131 (Edinburgh)](https://dc44131.org/) and [Abertay HackSoc](https://hacksoc.co.uk/) but I didn't want to use either Microsoft's Power Point (or Open Office) or Google's Slides.
In the past I've tried to use RemarkJS but at the time I had some issues with it and decide to not check it out again for my presentation needs.

For this project I used Markdown as the content format and [Marp](https://marp.app/) ([open-source](https://github.com/marp-team/marp)) as the core engine to build the slides into HTML and PDFs.

This project is [open source](https://github.com/geekmasher/presentations) and you can find the slides at [presentation.geekmasher.dev](https://presentation.geekmasher.dev)


## Markdown and Git(Hub)

First things first, using git to store and version control your slides is just awesome!
No longer are we using NFS shares or FTP servers to store our code, why shouldn't your slides be any different.

Markdown is then a natural choice from there as it's simple and easy to use.
Latex is great and a very powerful language and alternative but a little overkill for what I was looking.

The finally part is using GitHub to publicly share the content of the slides to share my knowledge.
This also helps for creating drafts of slides, staging environment, and requesting people to review your content using [Pull Requests](https://docs.github.com/en/github/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews).


### Structuring Markdown

There is two main structural components to think about when creating your slides.
The first is the how to separate slides from each other by using the build in markdown separator / `---` syntax.
This looks like the following:

```markdown
---
# Slide 1

Content for slide 1 goes here.

---
# Slide 2

More content for slide 2
```

This allows for lots of slides to be split up and structure as per your requirements.

Second are Marp directives which can be added at the top of the file or for each slide in the form of headers.
Here is an example of some core (but not all) directives at the top of this slide:

```markdown
---
theme: gaia
class: lead
paginate: true
backgroundColor: '#eae8db'
color: '#392020'
---
<!-- rest of the slides ... -->
```

Each of these directives is applied to every slide in the deck.
Here is a list of these main directives that I recommend to pay attention to:

- `theme`
  - Specify theme of the slide deck.
- `class`
  - Specify HTML class of slide’s `<section>` element.
- `paginate`
  - Show page number on the slide if you set `true`.
- `backgroundColor` and `color`
  - Setting `background` and `color` colours 


All of these can also be set using Markdown comments at each slide that can be parsed by Marp.
Example is the following for this slide:

```markdown
---
<!-- _class: lead -->
# Slide

And the slide content...
```

The underscore sets the directive for that one slide and if its removed that will apply to every slide until the directive is set again.

There are other things to look into such as the following but these aren't as critical.

<!-- TODO -->

## Marp!

Marp is the core technology used to create the slides deck from Markdown.
This was extremely easy after installing the [`marp-cli`](https://github.com/marp-team/marp-cli) using npm or [other package managers](https://github.com/marp-team/marp-cli#use-package-manager).

```bash
npm install --save-dev @marp-team/marp-cli
```

I recommend using NPM as this will be very useful for customisations.
For those whom use [VSCode there is a plugin](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) that can be used to make highlighting and preview the slides.

The CLI allows for a number of arguments which takes in markdown file(s) and outputs any format.

<!-- TODO: Customising Marp -->




```bash
marp --engine ./src/engine.js \
    --no-stdin \
    --output "index.html" index.md
```


## Deployment

The last and final step is to deploy your presentation to allow remote access and others to view the awesome work you have been developing.
I recommend using a service like [now.sh / vercel](https://now.sh) to make your life easier by doing the heavy lifting for you.

You can either use the CLI or their GitHub git integration to allow you to publish your presentations with a click of a button.
I'll be choosing the latter as this gives me the simplicity of deploying the application and all the different staging environments.


## Conclusion

Once setup and configured to your hearts content writing slides couldn't be easier.
Now you can create Markdown files and build an awesome looking slide deck built using open source tools and work on any platform. 


## Resources









