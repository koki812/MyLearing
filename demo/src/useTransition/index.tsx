import React, { useState, useEffect, useLayoutEffect } from "react";

export const DemoTrasition: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useLayoutEffect(() => {
        console.log("useLayoutEffect ------ updated");
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(!isVisible);
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [isVisible]);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>Visibility</button>
            {isVisible && <div>Transition</div>}
        </div>
    );
};
