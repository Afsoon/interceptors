/**
 * Returns a boolean indicating whether the given global property
 * is defined and is configurable.
 */
export function hasConfigurableGlobal(propertyName: string): boolean {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, propertyName)

  if (typeof descriptor === 'undefined') {
    return false
  }

  if (descriptor.get != null && typeof descriptor.get() === "undefined") {
    return false
  }

  if (typeof descriptor.set === 'undefined' && !descriptor.configurable) {
    console.error(
      `[MSW] Failed to apply interceptor: the global \`${propertyName}\` property is non-configurable. This is likely an issue with your environment. If you are using a framework, please open an issue about this in their repository.`
    )
    return false
  }

  return true
}
