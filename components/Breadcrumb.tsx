'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  customItems?: BreadcrumbItem[];
}

export function Breadcrumb({ customItems }: BreadcrumbProps) {
  const pathname = usePathname();

  const getDefaultItems = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const item: BreadcrumbItem = {
        label,
      };

      if (index !== paths.length - 1) {
        item.href = currentPath;
      }

      items.push(item);
    });

    return items;
  };

  const items = customItems || getDefaultItems();

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
          {index === 0 && (
            <Home className="h-4 w-4 text-gray-600" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-semibold">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
