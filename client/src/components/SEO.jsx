import React, { useEffect } from 'react';
import { BUSINESS_CONFIG } from '../config/business';

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

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: BUSINESS_CONFIG.name,
    description: defaultDesc,
    telephone: BUSINESS_CONFIG.phonePrimary,
    email: BUSINESS_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_CONFIG.address,
      addressLocality: BUSINESS_CONFIG.city,
      addressRegion: BUSINESS_CONFIG.state,
      postalCode: BUSINESS_CONFIG.pincode,
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Su 00:00-24:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_CONFIG.googleRating,
      reviewCount: BUSINESS_CONFIG.googleReviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    url: typeof window !== 'undefined' ? window.location.origin : '',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SEO;
