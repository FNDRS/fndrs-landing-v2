import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="bg-white w-screen min-h-screen">{children}</div>;
}
