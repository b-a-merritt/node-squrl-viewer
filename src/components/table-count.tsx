"use client";
import React from "react";
import { Loader } from "@/components/loader/loader";

interface TableCountProps {
  name: string;
}

export const TableCount = ({ name }: TableCountProps) => {
  const [count, setCount] = React.useState<null | number>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setLoading(true);
      const request = await fetch(`/api/count/${name}`, {
        signal: abortController.signal,
      });

      if (request.ok) {
        const response = await request.json();
        setCount(response);
      }

      setLoading(false);
    })();

    return () => abortController.abort("useEffect terminated");
  }, [name]);

  if (loading) return <Loader />;

  return <span>{count}</span>;
};
