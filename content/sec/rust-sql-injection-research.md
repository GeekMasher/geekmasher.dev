---
title: "SQL Injection in Rust; still possible?"
summary: "I wanted to know 2 simple questions: can I still get SQL Injection in Rust? What controls are in place to protect against it in SQLx? In the Rust community, we talk about 'Rust is secure' but is this from just memory related bugs or other security issues too?"
date: "2023-03-23T12:00:00.000Z"
banner:
  path: "/media/sec/rust-sql-injection-research.png"
  caption: "GeekMasher"
tags:
  - Security
  - AppSec
  - Rust
  - RustLang
  - YouTube

---

Over the past few years now I've been writing some of the backend applications in Rust and I asked myself two questions: 

- can I still get SQL Injection in Rust?
- what controls are in place to protect against it in SQLx?

In the Rust community, we talk about "Rust is secure" but is this from just memory related bugs or other security issues too?
Let's setup, test, and find out together if Rust and SQLx have some tricks up their sleeves when it comes to protecting against SQL Injection.


## Research Video

{{< youtube cBLZ8jbNtcw >}}

## Setup

**Source code:**

- [GeekMasher/rust-sqlx-research][research-github]

**Dependecies:**

- [SQLx](sqlx)
- [Tokio](tokio)
- [Anyhow](anyhow)

**Documentation:**

- [SQLx source code][sqlx]
  - [`sqlx::query_as!()` macro][sqlx-queryas-macro]
  - [`Parser::parse()`][sqlx-input-parse]
- [SQLx crate docs][sqlx-docs]
- [SQLx macros docs][sqlx-macros-docs]


## OWASP CheatSheet

As an objective of this research I wanted to share this knowledge with the community so I decided to share it with the [OWASP CheatSheet][owasp-cheatsheet] project.

[I created a Pull Request to the project][owasp-cheatsheet-pr] and now its merged so all developers if they are worried about how to use SQLx correctly and securely, they can use that resource.


## Resources





[research-github]: https://github.com/geekMasher/rust-sqlx-research
[owasp-cheatsheet]: https://cheatsheetseries.owasp.org/
[owasp-cheatsheet-pr]: https://github.com/OWASP/CheatSheetSeries/pull/1106

[sqlx]: https://github.com/launchbadge/sqlx
[sqlx-docs]: https://docs.rs/sqlx/latest
[sqlx-macros-docs]: https://docs.rs/sqlx_macros/latest

[sqlx-queryas-macro]: https://github.com/launchbadge/sqlx/blob/15458fa9d6f46a3c55fe39c166174e7ed65fa5b4/src/macros/mod.rs#L556-L563
[sqlx-input-parse]: https://github.com/launchbadge/sqlx/blob/15458fa9d6f46a3c55fe39c166174e7ed65fa5b4/sqlx-macros-core/src/query/input.rs#L36

[tokio]: https://tokio.rs/
[anyhow]: https://docs.rs/anyhow/latest

