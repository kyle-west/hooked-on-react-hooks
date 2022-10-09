import useState from './useState'
import useCallback from './useCallback'

// - Cache state with respect to the initialization params
//   - If init and initialArg are both provided, store init(initialArg) as state
//   - If just initialArg is provided, store that
// - Return the cached state and a dispatch function that when evoked updates the state via the reducer
//   - dispatch should have the signature of: (action) => void
//   - reducer should have the signature of: (currentState, action) => newState
//   - dispatch should also have a stable identity

export default function useReducer(reducer, initialArg = {}, init) {
  const [state, setState] = useState(() => init instanceof Function ? init(initialArg) : initialArg)

  const dispatch = useCallback((action) => {
    if (action) {
      setState((currentState) => reducer(currentState, action))
    }
  }, [reducer])
  
  return [state, dispatch]
}
