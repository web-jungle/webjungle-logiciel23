import { SimpleCTAWithImages } from "@/components/cta-feature";
import { FrequentlyAskedQuestions } from "@/components/faq";
import { Hero } from "@/components/hero";
import { SpotlightLogoCloud } from "@/components/logos-cloud";
import { Pricing } from "@/components/pricing";
import Section2 from "@/components/section2";

import { Testimonials } from "@/components/testimonials";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative  w-full overflow-hidden rounded-md bg-black/[0.96] antialiased ">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />
      <Hero />

      <Section2 />
      <SpotlightLogoCloud />

      <Testimonials />
      <Pricing />
      <FrequentlyAskedQuestions />
      <SimpleCTAWithImages />
    </div>
  );
}
