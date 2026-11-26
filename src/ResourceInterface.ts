import {
  BaseJsonLdItemInterface,
  getLdIri,
  JsonLdIri,
  JsonLdIriAble,
  JsonLdIriContainerInterface,
} from "jsonld-item"

// No prototype: an IRI such as "__proto__" or "constructor" coming from an
// API must stay a plain key, never reach Object.prototype.
export const resourceRegistered: JsonLdIriContainerInterface<BaseJsonLdItemInterface> =
  Object.create(null)

const addResource = (metaData: BaseJsonLdItemInterface) => {
  resourceRegistered[metaData["@id"]] = metaData
}

export function getResource<T = BaseJsonLdItemInterface>(
  jsonLdIriAble: JsonLdIriAble
): T | undefined {
  const id = getLdIri(jsonLdIriAble)
  if (id && resourceRegistered[id]) return resourceRegistered[id] as T

  return undefined
}

export function createResource<
  T extends BaseJsonLdItemInterface = BaseJsonLdItemInterface,
>(id: JsonLdIri, resource: Omit<T, "@id">): T {
  const built = { ...resource, "@id": id } as T

  addResource(built)

  return built
}
