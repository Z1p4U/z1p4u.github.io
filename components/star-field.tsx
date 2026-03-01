"use client"

import { useEffect, useRef } from "react"

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const starCount = 80
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      const size = Math.random() * 2 + 1
      star.className = "star"
      star.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(124, 58, 237, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        --twinkle-duration: ${Math.random() * 4 + 2}s;
        --twinkle-delay: ${Math.random() * 5}s;
      `
      fragment.appendChild(star)
    }

    for (let i = 0; i < 30; i++) {
      const star = document.createElement("div")
      const size = Math.random() * 1.5 + 0.5
      star.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        --twinkle-duration: ${Math.random() * 6 + 3}s;
        --twinkle-delay: ${Math.random() * 8}s;
      `
      star.className = "star"
      fragment.appendChild(star)
    }

    container.appendChild(fragment)

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
