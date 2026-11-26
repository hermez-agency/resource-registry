import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { DUPLICATE_COPY_WARNING, LOADED_MARKER } from "@/duplicateCopy"

const scope = globalThis as Record<symbol, unknown>

// Each `vi.resetModules()` + `import()` evaluates a fresh copy of the module,
// as a second copy of the package in node_modules would.
const loadCopy = async () => {
  vi.resetModules()
  return import("@/ResourceInterface")
}

describe("duplicate copy detection", () => {
  beforeEach(() => {
    delete scope[LOADED_MARKER]
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("stays silent when a single copy is loaded", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})

    await loadCopy()

    expect(warn).not.toHaveBeenCalled()
    expect(scope[LOADED_MARKER]).toBe(true)
  })

  it("warns once a second copy loads", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})

    const first = await loadCopy()
    const second = await loadCopy()

    expect(first.resourceRegistered).not.toBe(second.resourceRegistered)
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(DUPLICATE_COPY_WARNING)
  })

  it("names the cause and the peerDependency rule", () => {
    expect(DUPLICATE_COPY_WARNING).toContain("second copy")
    expect(DUPLICATE_COPY_WARNING).toContain("peerDependency")
  })
})
