
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout" suppressHydrationWarning>
      <nav>
        <Link className="flex items-center gap-2" href="/">
          <Image src={"/logo_light_name.svg"} alt="logo" width={200} height={32} />
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
