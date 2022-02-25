import React, { lazy, Suspense } from 'react';

const Suspensed = (Element) =>
  function suspense(props) {
    return (
      <Suspense fallback={<div />}>
        <Element {...props} />
      </Suspense>
    );
  };

export const Button = Suspensed(lazy(() => import('./Button/Button')));
export const Loader = Suspensed(lazy(() => import('./Loader/Loader')));
