import React, { useEffect, useRef, useState } from 'react';

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const el = (domRef.current as any) || null;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting);
        }
      });
    });
    observer?.observe(el);
    return () => observer?.unobserve(el);
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef as any}
    >
      {props.children}
    </div>
  );
}
export default FadeInSection;
