import React, { useEffect } from 'react';
export enum AdType {
  DEFAULT,
  ARTICLE,
  VERTICAL
}
const adUnitProps: Record<AdType, any> = {
  [AdType.DEFAULT]: {
    'data-ad-format': 'auto',
    'data-full-width-responsive': 'true'
  },
  [AdType.ARTICLE]: {
    'data-ad-format': 'fluid',
    'data-ad-layout': 'in-article'
  },
  [AdType.VERTICAL]: {
    'data-ad-format': 'auto',
    'data-full-width-responsive': 'true'
  }
};

interface GoogleAdProps {
  variant?: AdType;
  dataAdsSlot: string;
  dataAdsClient: string;
}

export function GoogleAd({
  variant = AdType.ARTICLE,
  dataAdsSlot,
  dataAdsClient
}: GoogleAdProps) {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-slot={dataAdsSlot}
      data-ad-client={dataAdsClient}
      // data-adtest="on"
      {...adUnitProps[variant]}
    />
  );
}
