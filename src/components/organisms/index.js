import React, { lazy, Suspense } from 'react';

const Suspensed = (Element) =>
  function suspense(props) {
    return (
      <Suspense fallback={<div />}>
        <Element {...props} />
      </Suspense>
    );
  };

export const LineChart = Suspensed(lazy(() => import('./LineChart/LineChart')));
export const Navbar = Suspensed(lazy(() => import('./Navbar/Navbar')));
export const Footer = Suspensed(lazy(() => import('./Footer/Footer')));
export const Popup = Suspensed(lazy(() => import('./Popup/Popup')));
