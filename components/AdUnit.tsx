'use client';
import { useEffect, useRef } from 'react';

// Replace SLOT_ID below with your data-ad-slot value from AdSense > Ads > By ad unit
const AD_SLOT_ID = 'REPLACE_WITH_YOUR_AD_SLOT_ID';
const AD_CLIENT = 'ca-pub-1653085663752838';

export default function AdUnit() {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silently ignore if AdSense script hasn't loaded yet
    }
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
