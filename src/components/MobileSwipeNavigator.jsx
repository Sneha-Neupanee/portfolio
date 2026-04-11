import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router-dom";

const pages = ["/", "/about", "/projects", "/skills", "/experience", "/contact"];

export default function MobileSwipeNavigator({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = pages.indexOf(location.pathname);

  const isMobile = () => window.innerWidth <= 768;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isMobile()) return;

      if (currentIndex < pages.length - 1) {
        navigate(pages[currentIndex + 1]);
      }
    },

    onSwipedRight: () => {
      if (!isMobile()) return;

      if (currentIndex > 0) {
        navigate(pages[currentIndex - 1]);
      }
    },

    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div {...handlers} style={{ height: "100%" }}>
      {children}
    </div>
  );
}