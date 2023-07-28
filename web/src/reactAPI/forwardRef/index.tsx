import { forwardRef } from "react";

export const ForwardRefDemo = forwardRef<HTMLDivElement, { text: string }>(
    ({ text }, ref) => {
        return <div ref={ref}>{text}</div>;
    }
);
