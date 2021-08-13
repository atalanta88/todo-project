import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls window view to top, on page refresh or redirect etc.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
