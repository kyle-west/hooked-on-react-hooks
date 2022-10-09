import useState from './useState'

// - Create a cached version of the following: { current: initialValue }
// - The return value should have a stable identity
//   - even a change in initialValue should not change the value returned from this function

export default function useRef(initialValue) {
  const [ref] = useState({ current: initialValue })
  return ref
}
