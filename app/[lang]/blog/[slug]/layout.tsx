import type React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="bg-white min-h-screen">{children}</div>;
}
