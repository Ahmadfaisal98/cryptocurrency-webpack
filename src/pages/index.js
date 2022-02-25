import React, { lazy, Suspense } from 'react';

const Suspensed = (Element) =>
  function suspense(props) {
    return (
      <Suspense fallback={<div />}>
        <Element {...props} />
      </Suspense>
    );
  };

export const Cryptocurrencies = Suspensed(
  lazy(() => import('./Cryptocurrencies/Cryptocurrencies'))
);
export const CryptoDetails = Suspensed(
  lazy(() => import('./CryptoDetails/CryptoDetails'))
);
export const Homepage = Suspensed(lazy(() => import('./Homepage/Homepage')));
export const News = Suspensed(lazy(() => import('./News/News')));
