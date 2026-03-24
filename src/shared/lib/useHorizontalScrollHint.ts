import { useEffect, useRef, useState } from "react";

type ScrollHintState = {
  scrollable: boolean;
  engaged: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

const EDGE_OFFSET = 4;

export function useHorizontalScrollHint<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<ScrollHintState>({
    scrollable: false,
    engaged: false,
    canScrollLeft: false,
    canScrollRight: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;

      const scrollable = element.scrollWidth - element.clientWidth > EDGE_OFFSET * 2;
      const canScrollLeft = element.scrollLeft > EDGE_OFFSET;
      const canScrollRight =
        element.scrollLeft + element.clientWidth < element.scrollWidth - EDGE_OFFSET;

      setState((current) => {
        if (
          current.scrollable === scrollable &&
          current.canScrollLeft === canScrollLeft &&
          current.canScrollRight === canScrollRight
        ) {
          return current;
        }

        return {
          ...current,
          scrollable,
          canScrollLeft,
          canScrollRight,
        };
      });
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    const markEngaged = () => {
      setState((current) => (current.engaged ? current : { ...current, engaged: true }));
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(element);

    requestUpdate();

    element.addEventListener("scroll", requestUpdate, { passive: true });
    element.addEventListener("pointerdown", markEngaged);
    element.addEventListener("touchstart", markEngaged, { passive: true });
    element.addEventListener("wheel", markEngaged, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      element.removeEventListener("scroll", requestUpdate);
      element.removeEventListener("pointerdown", markEngaged);
      element.removeEventListener("touchstart", markEngaged);
      element.removeEventListener("wheel", markEngaged);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return {
    ref,
    state,
  };
}
