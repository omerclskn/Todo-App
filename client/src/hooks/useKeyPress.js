import { useEffect } from "react";
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key, action, listen, control) {
  useEffect(() => {
    if (control !== -1) {
      function onKeyup(e) {
        if (e.key === key) action();
      }

      window.addEventListener("keyup", onKeyup);
      return () => window.removeEventListener("keyup", onKeyup);
    }
  }, [listen, control]); // eslint-disable-line
}
