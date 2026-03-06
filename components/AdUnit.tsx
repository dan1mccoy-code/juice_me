'use client';
import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-1653085663752838';

interface AdUnitProps {
  slot: string;
  format?: string;
  layout?: string;
  responsive?: boolean;
}

export default function AdUnit({ slot, format = 'auto', layout, responsive = false }: AdUnitProps) {
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
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  );
}
