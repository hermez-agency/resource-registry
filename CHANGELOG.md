# resource-registry

## 0.2.0

### Minor Changes

- 95b73df: Warn with `console.warn` when a second copy of the package loads: each copy would keep its own registry, so the message points to the peerDependency rule.

### Patch Changes

- efc7596: Security: the registry no longer has a prototype, so an IRI such as `__proto__` or `constructor` is stored and looked up as a plain key instead of reaching `Object.prototype`.

## 0.1.1

### Patch Changes

- 8a5bbda: Package metadata now points to Hermez: author, repository, bugs and homepage move to github.com/hermez-agency/resource-registry.
