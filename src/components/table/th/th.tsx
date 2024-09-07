"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sort } from "@/icons/sort";
import { SortAsc } from "@/icons/sort-asc";
import { SortDesc } from "@/icons/sort-desc";

interface ThProps {
  name: string;
}

export const Th = ({ name }: ThProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const field = searchParams.get("sortBy") || "";
  const order = searchParams.get("sortOrder") || "DESC";

  const handleClick = () => {
    const params = { sortBy: "", sortOrder: "DESC" };

    if (field === name) {
      if (order === "DESC") {
        params.sortOrder = "ASC";
        params.sortBy = field;
      } else {
        params.sortOrder = 'DESC';
        params.sortBy = '';
      }
    } else {
      params.sortOrder = 'DESC';
      params.sortBy = name;
    }

    const paramsString = new URLSearchParams(params).toString();

    router.push(`${pathname}?${paramsString}`)
  };

  const Icon = field === name ? (order === "ASC" ? SortAsc : SortDesc) : Sort;

  return (
    <th>
      <div onClick={handleClick}>
        <span>{name}</span>
        <Icon />
      </div>
    </th>
  );
};
