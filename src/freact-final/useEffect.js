import useRef from './useRef'

function same(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false
  if (arr1.length !== arr2.length) return false

  return arr1.every((item, idx) => Object.is(item, arr2[idx]))
}

// - Check if the dependencies have changed since the last call
// - If they have changed:
//   - run the previous effect's cleanup function (if any)
//   - run the effect callback

export default function useEffect(effect, dependencies) {
  const lastDepsRef = useRef()
  const cleanupRef = useRef()
  
  if (!same(lastDepsRef.current, dependencies)) {
    if (cleanupRef.current instanceof Function) {
      cleanupRef.current()
    }
    
    lastDepsRef.current = dependencies
    cleanupRef.current = effect()
  }
}
