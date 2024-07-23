import { lazy, Suspense } from "react";
import Spinning from "./Spinning/Spinning";
import FallBack from "./FallBack";

export interface Access {
  enable: boolean;
  message?: string;
  fallBackUrl?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lazyFnDelay = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importFunc: any,
  access: Access = {
    enable: true,
  }
) => {


   if (!access.enable) {
     return <FallBack access={access}></FallBack>;
   }
  const LazyComponent = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFunc());
      }, 1000);
    });
  });
  //const LazyComponent = lazy(importFunc);

  return (
    <Suspense fallback={<Spinning></Spinning>}>
      <LazyComponent />
    </Suspense>
  );
};


export const lazyFn = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importFunc: any,
  access: Access = {
    enable: true,
  }
) => {
  const LazyComponent = lazy(importFunc);

  if (!access.enable) {
    return <FallBack access={access}></FallBack>;
  }

  return (
    <Suspense fallback={<>Loading ....</>}>
      <LazyComponent />
    </Suspense>
  );
};
