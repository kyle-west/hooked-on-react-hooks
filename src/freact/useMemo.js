
// USAGE:
// const state = useMemo(() => expensiveFunction(value), [value])

export default function useMemo(getValue, dependencies) {
  // - Check if the dependencies have changed since the last call
  // - If they have changed:
  //   - compute the next value and store in cache
  //   - return the cached value
  
  return getValue()
}
