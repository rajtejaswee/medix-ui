import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
}) => {
  return (
    <div className="page-container">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-sm text-gray-500 mb-1">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight size={14} className="text-gray-400" />}
                  <span className={index === breadcrumbs.length - 1 ? 'text-gray-700' : ''}>
                    {item.label}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {children}
    </div>
  );
};
