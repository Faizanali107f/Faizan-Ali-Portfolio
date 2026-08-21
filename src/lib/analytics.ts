import { supabase } from '@/integrations/supabase/client';

export type CvDownloadSource =
  | 'hero'
  | 'navbar'
  | 'navbar_mobile'
  | 'contact';

/**
 * Records a CV/resume download click. Fire-and-forget: never blocks the download
 * and never throws into the UI.
 */
export const trackCvDownload = (source: CvDownloadSource) => {
  try {
    void supabase.from('cv_downloads').insert({
      source,
      page_path: typeof window !== 'undefined' ? window.location.pathname : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });

    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', 'cv_download', { source });
  } catch {
    /* analytics must never break the download */
  }
};
