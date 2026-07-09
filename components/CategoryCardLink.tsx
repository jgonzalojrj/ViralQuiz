"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

type CSSVariableProperties = CSSProperties & Record<`--${string}`, string>;

type CategoryCardLinkProps = {
  href: string;
  accent: string;
  emoji: string;
  title: string;
  description: string;
  quizCount: number;
};

export function CategoryCardLink({ href, accent, emoji, title, description, quizCount }: CategoryCardLinkProps) {
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = prefersReducedMotion ? 80 : 820;

    timeoutRef.current = setTimeout(() => {
      router.push(href);
    }, delay);
  }

  return (
    <>
      <a
        className={`category-card ${isTransitioning ? "category-card-active" : ""}`}
        href={href}
        onClick={handleClick}
        style={{ "--section-accent": accent } as CSSVariableProperties}
      >
        <div className="category-card-mark" aria-hidden="true">
          <span>{emoji}</span>
        </div>
        <div>
          <p className="quiz-card-kicker">{quizCount} tests</p>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="category-card-action">Ver tests</span>
      </a>

      {isTransitioning ? (
        <div className="category-transition-overlay" aria-hidden="true">
          <div
            className="category-transition-emoji"
            style={{ "--section-accent": accent } as CSSVariableProperties}
          >
            <span>{emoji}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
