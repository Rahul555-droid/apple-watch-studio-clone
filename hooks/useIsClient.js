import { useEffect, useState } from "react";

function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Set to true when running in the browser
    }
  }, []);

  return isClient;
}

export default useIsClient;
