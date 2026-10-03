// file: src/components/Lab/LabBreadcrumb.tsx
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function LabBreadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(p => p !== '');

  return (
    <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
        const title = path.charAt(0).toUpperCase() + path.slice(1);

        return (
          <div key={path} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="w-3 h-3 text-slate-600" />}
            {isLast ? (
              <span className="text-slate-200 font-medium">{title}</span>
            ) : (
              <Link to={routeTo} className="hover:text-accent-light transition-colors">
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
