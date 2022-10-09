import useState from './useState'
import useEffect from './useEffect'

// - Check if the dependencies have changed since the last call
// - If they have changed:
//   - compute the next value and store in cache
//   - return the cached value

export default function useMemo(getValue, dependencies) {
  const [value, setValue] = useState(getValue)

  useEffect(() => setValue(getValue), dependencies)

  return value
}
