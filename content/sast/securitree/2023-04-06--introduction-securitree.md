---
title: "SecuriTree: A TreeSitter based Security Tool for Neovim"
summary: "SecuriTree is a Neovim plugin which allows you to run TreeSitter queries in your IDE and report them to the end user as issues"
date: "2023-04-06T12:00:00.000Z"
banner:
  path: "/media/sast/securitree.png"
  caption: "GeekMasher"
tags:
  - Security
  - AppSec
  - SAST
  - Static Code Analysis
  - YouTube

---

[SecuriTree](SecuriTree) Nvim Plugin allows a security researcher or developer to highlight sections of code in [Neovim][Neovim] which might have security or quality issues with the code.

The project uses [TreeSitter](TreeSitter) (TS) and [Pattern Matching Queries for TS](TreeSitter-Pattern-Matching) to search and match on particular points of interest in any code.
Any language with a [TS Parser / Grammar](TreeSitter-Parsers) can be supported and must be install/present for the plugin to search in the code.

Queries are mainly to find points of interest in code and might lead to false positives.

## YouTube Video

{{< youtube PLHMmYLLhKo >}}


<!-- Resources -->

[SecuriTree]: https://github.com/geekMasher/securitree.nvim
[Neovim]: https://neovim.io/
[TreeSitter]: https://tree-sitter.github.io/tree-sitter/
[TreeSitter-Parsers]: https://tree-sitter.github.io/tree-sitter/#parsers
[TreeSitter-Pattern-Matching]: https://tree-sitter.github.io/tree-sitter/using-parsers#pattern-matching-with-queries


