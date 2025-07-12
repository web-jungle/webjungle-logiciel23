"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Logo } from "./logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  navItems: {
    name: string;
    link: string;
  }[];
  visible: boolean;
}

export const Navbar = () => {
  const navItems = [
    {
      name: "Accueil",
      link: "/",
    },
    {
      name: "Notre vision",
      link: "/notre-vision",
    },
    {
      name: "Nos solutions",
      link: "/nos-solutions",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [visible, setVisible] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={navRef} className="w-full fixed top-2 inset-x-0 z-50">
      <DesktopNav visible={visible} navItems={navItems} />
      <MobileNav visible={visible} navItems={navItems} />
    </div>
  );
};

const DesktopNav = ({ navItems, visible }: NavbarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const navContentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const hoverEffectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (desktopNavRef.current && navContentRef.current && buttonRef.current) {
      gsap.set(desktopNavRef.current, {
        width: "80%",
        height: "64px",
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(16px)",
      });

      gsap.set(navContentRef.current, {
        scale: 1,
        justifyContent: "center",
      });

      gsap.set(buttonRef.current, {
        scale: 1,
        opacity: 1,
      });
    }
  }, []);

  useEffect(() => {
    if (desktopNavRef.current && navContentRef.current && buttonRef.current) {
      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: "back.out(1.7)" },
      });

      tl.to(desktopNavRef.current, {
        backdropFilter: "blur(16px)",
        background: visible ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.4)",
        width: visible ? "38%" : "80%",
        height: visible ? "48px" : "64px",
        y: visible ? 8 : 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      }).to(
        navContentRef.current,
        {
          scale: visible ? 0.9 : 1,
          justifyContent: visible ? "flex-end" : "center",
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        0
      );

      if (!visible) {
        gsap.to(buttonRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(buttonRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.2,
        });
      }
    }
  }, [visible]);

  const handleMouseEnter = (idx: number) => {
    setHoveredIndex(idx);
    if (hoverEffectRef.current) {
      gsap.set(hoverEffectRef.current, {
        opacity: 0,
        scale: 0.8,
        background:
          "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
      });
      gsap.to(hoverEffectRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (hoverEffectRef.current) {
      gsap.to(hoverEffectRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      });
    }
  };

  return (
    <div
      ref={desktopNavRef}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "hidden lg:flex flex-row self-center items-center justify-between py-2 mx-auto px-6 rounded-full relative z-[60] backdrop-saturate-[1.8]"
      )}
    >
      <Logo />
      <div
        ref={navContentRef}
        className="lg:flex flex-row flex-1 items-center justify-center space-x-1 text-sm"
      >
        {navItems.map((navItem, idx) => (
          <div
            key={`nav-item-${idx}`}
            onMouseEnter={() => handleMouseEnter(idx)}
            className="relative"
          >
            <Link
              className="text-white/90 relative px-3 py-1.5 transition-colors"
              href={navItem.link}
            >
              <span className="relative z-10">{navItem.name}</span>
              {hoveredIndex === idx && (
                <div
                  ref={hoverEffectRef}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/20"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div ref={buttonRef}>
          <Button
            as={Link}
            href="/contact"
            variant="primary"
            className="hidden md:block rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
          >
            Contactez-nous
          </Button>
        </div>
      </div>
    </div>
  );
};

const MobileNav = ({ navItems, visible }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileNavRef.current) {
      gsap.set(mobileNavRef.current, {
        width: "80%",
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(16px)",
      });
    }
  }, []);

  useEffect(() => {
    if (mobileNavRef.current) {
      gsap.to(mobileNavRef.current, {
        backdropFilter: "blur(16px)",
        background: visible ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.4)",
        width: visible ? "80%" : "90%",
        y: visible ? 0 : 8,
        borderRadius: open ? "24px" : "9999px",
        padding: "8px 16px",
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }
  }, [visible, open]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (open) {
        gsap.set(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          display: "flex",
        });
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "back.out(1.7)",
          onComplete: () => {
            if (mobileMenuRef.current) {
              gsap.set(mobileMenuRef.current, { display: "none" });
            }
          },
        });
      }
    }
  }, [open]);

  return (
    <>
      <div
        ref={mobileNavRef}
        className={cn(
          "flex relative flex-col lg:hidden w-full justify-between items-center max-w-[calc(100vw-2rem)] mx-auto z-50 backdrop-saturate-[1.8] border border-solid border-white/40 rounded-full"
        )}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <Logo />
          {open ? (
            <IconX className="text-white/90" onClick={() => setOpen(!open)} />
          ) : (
            <IconMenu2
              className="text-white/90"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <div
          ref={mobileMenuRef}
          className="flex rounded-3xl absolute top-16 bg-black/80 backdrop-blur-xl backdrop-saturate-[1.8] inset-x-0 z-50 flex-col items-start justify-start gap-4 w-full px-6 py-8"
          style={{ display: "none" }}
        >
          {navItems.map(
            (navItem: { link: string; name: string }, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                onClick={() => setOpen(false)}
                className="relative text-white/90 hover:text-white transition-colors"
              >
                <span className="block">{navItem.name}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};
