"use client";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";

interface NavLinkProps extends LinkProps {
  className?: string;
  activeClassName: string;
}

const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({
  href,
  className,
  activeClassName,
  children,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...props}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
