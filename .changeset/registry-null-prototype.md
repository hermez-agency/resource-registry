---
"resource-registry": patch
---

Security: the registry no longer has a prototype, so an IRI such as `__proto__` or `constructor` is stored and looked up as a plain key instead of reaching `Object.prototype`.
