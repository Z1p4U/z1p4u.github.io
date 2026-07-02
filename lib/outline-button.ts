import type { PointerEvent } from "react";

export function setOutlineButtonPosition(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();

  event.currentTarget.style.setProperty(
    "--outline-x",
    `${event.clientX - rect.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--outline-y",
    `${event.clientY - rect.top}px`,
  );
}
