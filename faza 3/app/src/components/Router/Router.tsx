import { useEffect, useState } from "react";
import { MobileRouter } from "./MobileRouter";
import { WebRouter } from "./WebRouter";

export const Router = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileRouter /> : <WebRouter />;
};
