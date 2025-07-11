"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export function SpotlightLogoCloud() {
  const logos = [
    {
      name: "",
      src: "/logo/btp1.png",
    },
    {
      name: "",
      src: "/logo/btp2.png",
    },
    {
      name: "",
      src: "/logo/btp3.png",
    },
    {
      name: "",
      src: "/logo/btp4.png",
    },
  ];

  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden">
      <div className="text-balance relative z-20 mx-auto mb-4 max-w-4xl text-center text-lg font-semibold tracking-tight text-neutral-300 md:text-3xl px-4">
        <Balancer>
          <h2
            className={cn(
              "inline-block bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
              "bg-clip-text text-transparent"
            )}
          >
            Ils nous font confiance
          </h2>
        </Balancer>
      </div>
      <p className="text-center max-w-lg mx-auto text-base md:text-lg font-sans text-neutral-500 mt-4 mb-8 md:mb-10 px-4">
        Nous leur avons fait gagner en efficacité et en productivité !
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-3xl mx-auto relative px-4">
        {logos.map((logo, idx) => (
          <div
            key={logo.src + idx}
            className="flex items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={300}
              height={300}
              className="w-full max-w-[200px] object-contain select-none filter invert"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
