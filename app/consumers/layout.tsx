"use client";
import lumenFull from "../../app/lumen-full.png";
import Image from "next/image";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={lumenFull}
        alt="Lumen Logo"
        className="w-24"
        onClick={() => {
          window.history.back();
        }}
      />
      <div className="max-w-md mx-auto w-full">{children}</div>
    </div>
  );
}
