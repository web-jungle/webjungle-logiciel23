/**
 * A component that creates a glowing effect around its container with automatic rotation.
 * Inspired by Aceternity UI's glowing effect component.
 *
 * @component
 * @param {Object} props - The component props
 * @param {number} [props.blur=0] - The amount of blur applied to the glow effect (in pixels)
 * @param {number} [props.spread=20] - How far the glow effect spreads (in degrees)
 * @param {'default'|'white'} [props.variant='default'] - The color variant of the glow
 * @param {boolean} [props.glow=false] - Whether the glow effect is enabled
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {boolean} [props.disabled=false] - Whether the effect is disabled
 * @param {number} [props.borderWidth=1] - Width of the glowing border in pixels
 * @param {boolean} [props.autoRotate=true] - Whether the glow should rotate automatically
 * @param {number} [props.rotationSpeed=3] - Speed of the rotation animation in seconds per full rotation
 *
 * @example
 * ```jsx
 * <GlowingEffect
 *   blur={10}
 *   spread={30}
 *   variant="default"
 *   glow={true}
 *   disabled={false}
 *   autoRotate={true}
 *   rotationSpeed={2}
 * >
 *   <div>Content goes here</div>
 * </GlowingEffect>
 * ```
 */

"use client";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";
import { memo, useEffect, useRef } from "react";

interface GlowingEffectProps {
  blur?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  borderWidth?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    borderWidth = 1,
    disabled = false,
    autoRotate = true,
    rotationSpeed = 3,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);

    useEffect(() => {
      if (disabled || !containerRef.current) return;

      const element = containerRef.current;

      // Activer l'effet immédiatement
      element.style.setProperty("--active", "1");

      if (autoRotate) {
        // Animation continue de rotation
        const startAnimation = () => {
          if (animationRef.current) {
            animationRef.current.stop();
          }

          animationRef.current = animate(0, 360, {
            duration: rotationSpeed,
            ease: "linear",
            repeat: Infinity,
            onUpdate: (value) => {
              if (element) {
                element.style.setProperty("--start", String(value));
              }
            },
          });
        };

        startAnimation();
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }, [disabled, autoRotate, rotationSpeed]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "1",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
