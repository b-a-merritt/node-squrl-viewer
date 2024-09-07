"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBreadcrumb = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname.split('/').filter(Boolean).map((item) => (
        <li key={item}>
          <span>/</span>{" "}
          <Link href={`/${item}`}>{item}</Link>
        </li>
      ))}
    </>
  );
};
