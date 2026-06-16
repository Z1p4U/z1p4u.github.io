"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  InitialHomeLoader,
  INITIAL_HOME_LOADER_BACKGROUND,
} from "@/components/initial-home-loader";

type PageTransitionProps = {
  children: ReactNode;
};

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/service": "Services",
  "/project": "Work",
  "/pricing": "Pricing",
  "/contact": "Contact",
  "/credits": "Credits",
};

const scrollLockKeys = new Set([
  " ",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
]);

const routeVeilStyle: CSSProperties = {
  background: INITIAL_HOME_LOADER_BACKGROUND,
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const label = routeLabels[pathname] ?? "Page";
  const previousPathnameRef = useRef(pathname);
  const shouldShowInitialIntro = pathname === "/";
  const introActiveRef = useRef(shouldShowInitialIntro);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showIntro, setShowIntro] = useState(shouldShowInitialIntro);
  const [showTransition, setShowTransition] = useState(false);
  const isMotionBlocking = showIntro || showTransition;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMotionBlocking) {
      return;
    }

    const shouldResetScroll = showIntro && pathname === "/";
    const root = document.documentElement;
    const body = document.body;
    const previousScrollRestoration = window.history.scrollRestoration;

    if (shouldResetScroll) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const scrollX = shouldResetScroll ? 0 : window.scrollX;
    const scrollY = shouldResetScroll ? 0 : window.scrollY;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverscroll = root.style.overscrollBehavior;
    const previousRootCursor = root.style.cursor;
    const previousThumbHeight = root.style.getPropertyValue(
      "--page-scrollbar-thumb-height",
    );
    const previousThumbTop = root.style.getPropertyValue(
      "--page-scrollbar-thumb-top",
    );
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousBodyTouchAction = body.style.touchAction;
    const previousBodyCursor = body.style.cursor;
    const previousBodyPaddingRight = body.style.paddingRight;

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const preventKeyScroll = (event: KeyboardEvent) => {
      if (scrollLockKeys.has(event.key)) {
        event.preventDefault();
      }
    };
    const documentHeight = Math.max(
      root.scrollHeight,
      body.scrollHeight,
      root.offsetHeight,
      body.offsetHeight,
      root.clientHeight,
    );
    const viewportHeight = window.innerHeight;
    const scrollableHeight = Math.max(documentHeight - viewportHeight, 0);
    const thumbHeight =
      scrollableHeight > 0
        ? Math.max((viewportHeight / documentHeight) * viewportHeight, 40)
        : viewportHeight;
    const thumbTravel = Math.max(viewportHeight - thumbHeight, 0);
    const thumbTop =
      scrollableHeight > 0
        ? Math.min((scrollY / scrollableHeight) * thumbTravel, thumbTravel)
        : 0;

    root.classList.add("page-motion-lock");
    body.classList.add("page-motion-lock");
    root.style.setProperty("--page-scrollbar-thumb-height", `${thumbHeight}px`);
    root.style.setProperty("--page-scrollbar-thumb-top", `${thumbTop}px`);
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    root.style.cursor = "wait";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.touchAction = "none";
    body.style.cursor = "wait";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("wheel", preventScroll, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchmove", preventScroll, {
      capture: true,
      passive: false,
    });
    window.addEventListener("keydown", preventKeyScroll, { capture: true });

    return () => {
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
      window.removeEventListener("keydown", preventKeyScroll, { capture: true });
      root.classList.remove("page-motion-lock");
      body.classList.remove("page-motion-lock");
      if (previousThumbHeight) {
        root.style.setProperty(
          "--page-scrollbar-thumb-height",
          previousThumbHeight,
        );
      } else {
        root.style.removeProperty("--page-scrollbar-thumb-height");
      }
      if (previousThumbTop) {
        root.style.setProperty("--page-scrollbar-thumb-top", previousThumbTop);
      } else {
        root.style.removeProperty("--page-scrollbar-thumb-top");
      }
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscroll;
      root.style.cursor = previousRootCursor;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscroll;
      body.style.touchAction = previousBodyTouchAction;
      body.style.cursor = previousBodyCursor;
      body.style.paddingRight = previousBodyPaddingRight;
      window.history.scrollRestoration = previousScrollRestoration;
      window.scrollTo(scrollX, scrollY);
    };
  }, [isMotionBlocking, pathname, showIntro]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (introActiveRef.current) {
      return;
    }

    const startTimer = window.setTimeout(() => {
      setShowTransition(true);
    }, 0);
    const endTimer = window.setTimeout(() => {
      setShowTransition(false);
    }, 760);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(endTimer);
    };
  }, [pathname]);

  const handleIntroDone = useCallback(() => {
    introActiveRef.current = false;
    setShowIntro(false);
  }, []);

  const portalRoot = isHydrated ? document.body : null;

  return (
    <>
      {portalRoot && showIntro
        ? createPortal(
            <InitialHomeLoader onDone={handleIntroDone} />,
            portalRoot,
          )
        : null}
      {portalRoot && isMotionBlocking
        ? createPortal(
            <span className="page-motion-fake-scrollbar" aria-hidden />,
            portalRoot,
          )
        : null}
      {portalRoot && showTransition
        ? createPortal(
            <div
              key={`route-veil-${pathname}`}
              className="route-transition-veil"
              style={routeVeilStyle}
              aria-hidden
            >
              <span className="route-transition-label">{label}</span>
            </div>,
            portalRoot,
          )
        : null}
      <div key={`page-frame-${pathname}`} className="page-transition-frame">
        {children}
      </div>
    </>
  );
}
