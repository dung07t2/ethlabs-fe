import React, { useLayoutEffect, useState } from 'react';

export const useElementSize = (target: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!target.current?.getBoundingClientRect) return;
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  return size;
};
