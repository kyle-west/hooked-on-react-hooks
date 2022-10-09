export default function useEffect(effect, dependencies) {
  // - Check if the dependencies have changed since the last call
  // - If they have changed:
  //   - run the previous effect's cleanup function (if any)
  //   - run the effect callback
}