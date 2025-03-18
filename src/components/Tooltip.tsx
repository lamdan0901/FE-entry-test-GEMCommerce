import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  show: boolean;
  children: React.ReactNode;
}

const SPACE_BETWEEN_TOOLTIP_AND_TARGET = 8;

export const Tooltip = ({ text, show, children }: TooltipProps) => {
  const [internalShow, setInternalShow] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef<HTMLDivElement>(null);

  const showTooltip = show && internalShow;

  useEffect(() => {
    const updatePosition = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top - SPACE_BETWEEN_TOOLTIP_AND_TARGET,
          left: rect.left + rect.width / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [showTooltip]);

  return (
    <>
      <div
        onMouseEnter={() => setInternalShow(true)}
        onMouseLeave={() => setInternalShow(false)}
        ref={targetRef}
      >
        {children}
      </div>
      {showTooltip &&
        createPortal(
          <div
            className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
            }}
          >
            <div className="px-2 py-1 text-xs text-[#F9F9F9] bg-[#424242] rounded-lg whitespace-nowrap">
              {text}
            </div>
            <div className="size-2 bg-[#424242] rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-[2px]" />
          </div>,
          document.getElementById("tooltip-root") || document.body
        )}
    </>
  );
};
