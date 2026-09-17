import React, { useEffect } from 'react';

const SEO = ({ title, description }) => {
  const defaultTitle = 'Golden Packers and Movers | Reliable Packing & Moving Services';
  const defaultDesc = 'Golden Packers and Movers provides reliable packing, moving, relocation and transportation services with safe handling and professional support.';

  useEffect(() => {
    document.title = title ? `${title} | Golden Packers and Movers` : defaultTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDesc);
    }
  }, [title, description]);

  return null;
};

export default SEO;
