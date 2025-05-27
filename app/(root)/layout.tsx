import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RootLayout = async({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }
  return (
    <div className="root-layout" suppressHydrationWarning>
      <nav>
        <Link className="flex items-center gap-2" href="/">
          <Image
            src={"/logo_light_name.svg"}
            alt="logo"
            width={200}
            height={32}
          />
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
