/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useEffect } from "react";
import { useActivate, useUnactivate } from 'react-activation';


export const useCacheScroll = (
  warpDom: HTMLDivElement | null | undefined,
) => {
  const cacheScroll = useMemo(() => {
    return {
      scrollTop: 0,
      scrollLeft: 0,
    };
  }, []);
  useActivate(() => {
    if (warpDom && window.__POWERED_BY_QIANKUN__) {
      warpDom.scrollTop = cacheScroll.scrollTop;
      warpDom.scrollLeft = cacheScroll.scrollLeft;
    }
  });
  useEffect(() => {
    if (warpDom) {
      const listener = function (){
        cacheScroll.scrollTop = warpDom?.scrollTop || 0;
        cacheScroll.scrollLeft = warpDom?.scrollLeft || 0;
      };
      warpDom.addEventListener('scroll', listener);
      return () => {
        warpDom.removeEventListener('scroll', listener);
      };
    }
    return () => {
    };
  }, [warpDom]);
};