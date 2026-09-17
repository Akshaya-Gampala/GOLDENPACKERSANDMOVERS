import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const ServiceCard = ({ service }) => {
  // Dynamically map icon string name to Lucide Icon component
  const IconComponent = Icons[service.icon] || Icons.Package;

  return (
    <div className="bright-card rounded-2xl p-6 relative flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
          <IconComponent className="w-7 h-7" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/get-quote?service=${encodeURIComponent(service.title)}`}
          className="text-xs font-extrabold tracking-wider uppercase text-amber-600 group-hover:text-amber-700 flex items-center gap-1.5 transition-colors"
        >
          Request Quote <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
