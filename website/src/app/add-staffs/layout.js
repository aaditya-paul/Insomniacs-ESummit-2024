import React, {Suspense} from "react";

export default function Layout({children}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>{children}</section>
    </Suspense>
  );
}
