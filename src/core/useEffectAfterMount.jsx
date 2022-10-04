import { useEffect, useRef } from "react";
const useEffectAfterMount = (cb, dependencies) => {
  const mounted = useRef(true);
  useEffect(() => {
    if (!mounted.current) {
      return cb();
    }
    mounted.current = false;
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};
export default useEffectAfterMount;