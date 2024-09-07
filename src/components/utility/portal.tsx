'use client';

import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps extends React.PropsWithChildren {
  wrapperId?: string;
}

export const Portal = ({
  children,
  wrapperId = 'root-portal-wrapper',
}: PortalProps) => {
  const [wrapper, setWrapper] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    let element = document.getElementById(wrapperId);
    let portalCreated = false;

    if (!element) {
      portalCreated = true;

      element = document.createElement('div');
      element.setAttribute('id', wrapperId);

      document.body.appendChild(element);
    }

    setWrapper(element);

    return () => {
      if (portalCreated && element?.parentNode?.removeChild) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (!wrapper) {
    return null;
  }

  return ReactDOM.createPortal(children, wrapper);
};
