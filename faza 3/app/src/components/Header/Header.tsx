import { useEffect, useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { WebHeader } from "./WebHeader";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return !isMobile ? <WebHeader /> : <MobileHeader />;
};

export default Header;
