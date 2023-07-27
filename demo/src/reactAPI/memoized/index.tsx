import { memo } from "react";

export const Memoized = memo(({ count }: { count: number }) => {
    console.log("Rendering");
    return <div>{count}</div>;
});
