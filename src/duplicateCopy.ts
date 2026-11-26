/**
 * Global marker set when a copy of the package loads. `Symbol.for` returns the
 * same symbol across every copy, so a second copy finds the first one's mark.
 */
export const LOADED_MARKER = Symbol.for("resource-registry.loaded")

export const DUPLICATE_COPY_WARNING =
  "[resource-registry] A second copy of resource-registry has been loaded. " +
  "Each copy keeps its own registry, so a resource registered through one copy " +
  "is invisible from the other. This usually means a library declares " +
  "resource-registry as a dependency: it must be a peerDependency instead. " +
  "See https://github.com/hermez-agency/resource-registry#one-registry-per-application"

/**
 * Marks this copy as loaded, and warns when another copy already did.
 */
export function warnOnDuplicateCopy(): void {
  const scope = globalThis as Record<symbol, unknown>

  if (scope[LOADED_MARKER]) {
    console.warn(DUPLICATE_COPY_WARNING)
    return
  }

  scope[LOADED_MARKER] = true
}
