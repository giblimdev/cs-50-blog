"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type BreadcrumbsProps = {
  segmentNames?: Record<string, string>;
  hideSegments?: string[];
  className?: string;
};

export default function Breadcrumbs({
  segmentNames = {},
  hideSegments = [],
  className = "",
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className={`text-sm text-gray-500 mb-6 ${className}`}>
      <Link
        href="/"
        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
      >
        Home
      </Link>

      {pathSegments.map((segment, index) => {
        if (hideSegments.includes(segment)) return null;

        const segmentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const fullPath = pathSegments.slice(0, index + 1).join("/");
        const segmentName =
          segmentNames[fullPath] ||
          segmentNames[segment] ||
          segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/[-_]/g, " ");

        return (
          <span key={segment}>
            <span className="mx-2 text-gray-400">/</span>
            {index === pathSegments.length - 1 ? (
              <span className="font-medium text-indigo-900 dark:text-indigo-100">
                {segmentName}
              </span>
            ) : (
              <Link
                href={segmentPath}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                {segmentName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
