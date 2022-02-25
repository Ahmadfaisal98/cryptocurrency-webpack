import React, { lazy, Suspense } from 'react';

const Suspensed = (Element) =>
  function suspense(props) {
    return (
      <Suspense fallback={<div />}>
        <Element {...props} />
      </Suspense>
    );
  };

export const MenuButton = Suspensed(
  lazy(() => import('./MenuButton/MenuButton'))
);
