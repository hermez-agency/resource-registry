---
"resource-registry": minor
---

Warn with `console.warn` when a second copy of the package loads: each copy would keep its own registry, so the message points to the peerDependency rule.
