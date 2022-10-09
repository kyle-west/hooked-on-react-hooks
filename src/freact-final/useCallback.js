import useMemo from './useMemo'

// - Return a cached version of the callback
// - Update the value when the dependencies change

export default function useCallback(callback, dependencies) {
  return useMemo(() => callback, dependencies)
}
