"use client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex gap-2 items-center text-sm text-black px-2 py-1 shrink-0 relative z-20"
    >
      <Image src="/logo.png" alt="Logo" width={32} height={32} />

      <span className="font-medium text-white">Web - Jungle</span>
    </Link>
  );
};
