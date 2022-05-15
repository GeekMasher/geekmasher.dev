---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
summary: {{ .Summary }}
banner:
  path: {{ .Banner.path }}
  caption: {{ .Banner.caption }}
  link: {{ .Banner.link }}
draft: true

---

