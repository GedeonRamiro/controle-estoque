import React, { Suspense } from 'react';

export default function LazyLoading(Component) {
  console.log(Component)
  return (props) => (
    <Suspense fallback={<span>Loading...</span>}>
      <Component {...props} />
    </Suspense>
  );
}