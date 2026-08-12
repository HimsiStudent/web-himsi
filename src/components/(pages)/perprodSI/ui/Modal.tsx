"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { sacredEase } from "@/lib/perprodSI/motion";
import { cn } from "@/lib/perprodSI/utils";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog — usually its title. */
  labelledBy: string;
  /** Panel classes, so each caller can bring its own atmosphere. */
  className?: string;
  /** Panel inline style (e.g. the `--realm` colour custom property). */
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Modal dialog rendered through a portal on <body> so it escapes the sticky
 * header's stacking context. Handles the four things a dialog owes the user:
 * Escape + backdrop to dismiss, focus moved in and restored on close, Tab
 * cycled inside the panel, and the page behind it kept from scrolling.
 *
 * Presentation is left to the caller via `className` — this only owns the
 * behaviour, the backdrop, and the entrance/exit motion.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  className,
  style,
  children,
}: ModalProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock the page behind the dialog and hand focus back on close. The gutter
  // padding keeps the layout from jumping when the scrollbar is removed
  // (matches the scroll lock the mobile nav already uses).
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;

    const root = document.documentElement;
    const gutter = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPad = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (gutter > 0) root.style.paddingRight = `${gutter}px`;

    return () => {
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPad;
      restoreRef.current?.focus?.();
    };
  }, [open]);

  // Move focus into the panel once it has been painted.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      (panel.querySelector<HTMLElement>(FOCUSABLE) ?? panel).focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop — dismisses on click, invisible to assistive tech */}
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.4, ease: sacredEase }}
            className="absolute inset-0 bg-navy/35 backdrop-blur-[3px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            style={style}
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: reduce ? 0.01 : 0.5, ease: sacredEase }}
            className={cn(
              "relative max-h-[85svh] w-full overflow-y-auto overscroll-contain rounded-[1.75rem] bg-cream shadow-[0_32px_80px_-32px_rgba(36,55,74,0.55)] focus:outline-none",
              className,
            )}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
