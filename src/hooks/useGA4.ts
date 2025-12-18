import { useEffect } from 'react';
import configData from '../data/config.json';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const useGA4 = () => {
  useEffect(() => {
    // Initialize GA4
    if (configData.ga4MeasurementId && configData.ga4MeasurementId !== 'G-XXXXXXXXXX') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${configData.ga4MeasurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', configData.ga4MeasurementId);
    }
  }, []);

  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  };

  return { trackEvent };
};
